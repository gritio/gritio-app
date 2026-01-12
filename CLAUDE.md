# HouseholdTracker - Goal & Task Tracking Application

## Project Overview

HouseholdTracker is a full-stack goal and task tracking application built with:
- **Frontend**: React (Next.js) with TypeScript and Tailwind CSS
- **Backend**: NestJS with PostgreSQL and Prisma ORM
- **Authentication**: JWT-based auth with Auth0 integration

## Key Features

- **Yearly Goals**: Create annual goals with monthly breakdowns (Weight, Count, Time, other units)
- **Task Tracking**: Create daily/weekly tasks linked to goals with different measurement types:
  - **Number**: Simple checkbox completion (e.g., gym attendance)
  - **Steps**: Track step counts (stored in steps)
  - **Time**: Track time durations (stored in minutes)
  - **Distance**: Track distance (stored in km)
- **Monthly Aggregation**: TaskMonthAggregation table stores pre-computed monthly progress
- **Progress Visualization**: Weekly task view with progress circles and charts
- **Hover Modals**: View task progress breakdowns when hovering over monthly goals (disabled during editing)

## Architecture

### Database Schema (Key Tables)
- `User`: Auth0 integration + local auth
- `Goal`: Yearly goals with status tracking
- `Task`: Daily/weekly tasks with type and frequency
- `TaskCompletion`: Individual task completion logs
- `TaskMonthAggregation`: Pre-computed monthly totals (totalValue, daysWithActivity, target)
- `MonthlyGoal`: Monthly breakdown of yearly goals
- Supporting: `WeightGoal`, `CountGoal`, `TimeGoal`

### Data Storage Conventions
- **Time tasks**: Stored in minutes (frontend converts h:mm to minutes, backend stores as-is)
- **Steps/Distance**: Raw values (steps, km)
- **Number tasks**: Count of completions
- **Monthly targets**: Calculated based on frequency (daily: target*30, weekly: target*timesPerWeek*4)

### Frontend Components
- `CollapsibleGoalRow`: Goal with expandable monthly tiles and hover modals
- `WeeklyTaskView`: Weekly grid showing 7 days with input fields per task type
- `TodayView`: Daily task checklist
- `GoalDetail`: Detailed goal view with task timeline

### Backend Services
- `TasksService`: Task CRUD, completion logging, month aggregation calculation
- `GoalsService`: Goal management and progress calculation

## Configuration

- **Highlight Color**: #805232 (brown)
- **Type Enum Values**: NUMBER, TIME, STEPS, DISTANCE (uppercase)
- **Frequency Enum Values**: DAILY, WEEKLY (uppercase)

## Important Notes

- Type/Frequency enums use uppercase (NUMBER, DAILY) in database but sent as lowercase from frontend and converted
- TaskMonthAggregation.target stores the monthly target (not daily target)
- Monthly progress shows percentage based on total monthly target
- For current month: shows actual % of completed vs monthly target
- For past months: shows actual % of completed vs monthly target
- Hover modal does not show when editing a monthly goal
- Time values must be in minutes for correct percentage calculations

# Prisma Database Commands

## Workflow for Database Changes

When you make changes to `src/api/prisma/schema.prisma`, execute these commands in order:

```bash
# 1. Create and apply a new migration
npx prisma migrate dev --name <description>

# 2. Generate the updated Prisma client
npx prisma generate

# 3. Seed the database with initial data
npm run seed

# 4. Rebuild the application
npm run build
```

## Common Prisma Commands

### Development Commands
- `npx prisma migrate dev --name <name>` - Create a new migration and apply it
- `npx prisma generate` - Generate Prisma client (runs automatically with migrate dev)
- `npm run seed` - Run seed.ts to populate test data
- `npx prisma studio` - Open Prisma Studio for visual database management

### Production Commands
- `npx prisma migrate deploy` - Apply pending migrations (use in CI/CD)
- `npx prisma generate` - Generate client before building

### Inspection & Debugging
- `npx prisma db push` - Sync schema without creating migrations (dev only)
- `npx prisma migrate resolve --rolled-back <migration_name>` - Mark migration as rolled back
- `npx prisma migrate status` - View migration status

### Full Reset (Development Only)
- `npx prisma migrate reset` - Reset database and re-run all migrations + seed

## Seed File Location

`src/api/prisma/seed.ts` - Contains test users:
- sowmyasniyer@gmail.com / password123
- sharathnatraj@gmail.com / password123

## Important Notes

- Always run migrations in order
- seed.ts uses `upsert` so it's safe to run multiple times
- Generate runs automatically with `migrate dev`
- Never skip `npm run seed` after migrations in development

# Deployment Guide: Docker + GitHub Actions → Railway

## Overview

This guide covers deploying the Gritio app to Railway using Docker and GitHub Actions for automated CI/CD.

**Final Architecture:**
- Frontend (Next.js) and Backend (NestJS) containerized with Docker
- PostgreSQL managed by Railway
- Automated deployments via GitHub Actions
- All within Railway's $5/month Hobby plan

## Phase 1: Local Docker Setup

### Docker Architecture
- **Backend Dockerfile** (`src/api/Dockerfile`): Build context is `src/api`, works for both local and Railway
- **Frontend Dockerfile** (`Dockerfile` root): Multi-stage build, serves dist on port 3000
- **docker-compose.yml** (`docker-compose.yml` root): Local development setup

### Backend Dockerfile Key Points
```dockerfile
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && node dist/main"]
```

### docker-compose Backend Service
```yaml
backend:
  build:
    context: src/api          # Build context is the api directory
    dockerfile: Dockerfile     # Simpler path since context is src/api
  container_name: gritio-backend
```

### Important Docker Notes
- **Build vs Runtime**: RUN commands execute during build, CMD at runtime
- **WORKDIR**: Sets working directory for all subsequent commands
- **Migration Timestamps**: Must be in chronological order (use `npx prisma migrate dev --name <desc>`)
- **Seed File**: `src/api/prisma/seed.ts` runs on container startup

### Test Docker Locally
```bash
docker-compose down -v  # Remove volumes for clean start
docker-compose up
# Verify: Frontend http://localhost:5173, Backend http://localhost:3000
```

## Phase 2: Railway Account Setup (15 mins)

### 2.1 Create Railway Account
- Sign up at https://railway.app
- Verify email

### 2.2 Create Railway Project
- Click "New Project"
- Name: "gritio-app"

### 2.3 Get Railway API Token
- Account Settings → Generate API token
- Save for GitHub Secrets

### 2.4 Add Payment Method
- Add credit card (charges only beyond $5 hobby plan)

## Phase 3: GitHub Setup (30 mins)

### 3.1 Push Code to GitHub
```bash
git add .
git commit -m "Initial commit with Docker setup"
git push origin main
```

### 3.2 Add GitHub Secrets
**Location:** GitHub repo → Settings → Secrets and variables → Actions

**Required Secrets:**
1. `RAILWAY_API_TOKEN` - Railway API token from 2.3
2. `RAILWAY_PROJECT_ID` - From Railway dashboard
3. `NEXT_PUBLIC_API_URL` - Backend service URL (populated after deployment)
4. `DATABASE_URL` - Railway PostgreSQL connection string

### 3.3 Create GitHub Actions Workflow
**Location:** `.github/workflows/deploy.yml`
- Trigger: on push to main branch
- Checkout code
- Build Docker images
- Push to Railway Registry
- Deploy services
- Verify deployment

## Phase 4: Railway Infrastructure Setup (30 mins)

### 4.1 Create PostgreSQL Service
**In Railway dashboard:**
- Add service → PostgreSQL
- Name: "gritio-postgres"
- Get connection string (DATABASE_URL)

### 4.2 Configure Environment Variables
**In Railway dashboard, set:**
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - "production"
- `AUTH0_DOMAIN` - Your Auth0 domain
- `AUTH0_CLIENT_ID` - Your Auth0 client ID
- `AUTH0_CLIENT_SECRET` - Your Auth0 secret
- `JWT_SECRET` - Random secret key

## Phase 5: First Deployment (1 hour)

### 5.1 Create Backend Service
**In Railway dashboard:**
- Add service → Git Repository (connect GitHub repo)
- Service name: "gritio-backend"
- Dockerfile path: `src/api/Dockerfile`
- Start command: `npm run start:prod`
- Port: 3000

### 5.2 Create Frontend Service
**In Railway dashboard:**
- Add service → Git Repository (connect GitHub repo)
- Service name: "gritio-frontend"
- Dockerfile path: `Dockerfile`
- Start command: `npm start`
- Port: 3000
- Environment: `NEXT_PUBLIC_API_URL` = Backend service URL

### 5.3 Deploy
- Manual: Click "Deploy" in Railway dashboard
- Automatic: GitHub Actions triggers on push

### 5.4 Verify Deployment
- Check all services deployed successfully
- Test frontend loads at Railway URL
- Verify frontend can call backend API

## Phase 6: GitHub Actions CI/CD (45 mins)

### 6.1 Workflow File
**Location:** `.github/workflows/deploy.yml`
- Runs tests on push
- Builds Docker images
- Pushes to Railway Registry
- Deploys services
- Notifies on success/failure

### 6.2 Test Automation
- Make code change
- Push to main
- Watch GitHub Actions run
- Verify deployment in Railway dashboard

## Phase 7: Post-Deployment (30 mins)

### 7.1 Custom Domain (Optional)
- Buy domain
- Update Railway domain settings
- Update Auth0 redirect URLs

### 7.2 Monitoring
- Monitor Railway dashboard logs
- Set up GitHub Actions log monitoring
- Configure alerts if needed

### 7.3 Documentation
- Update README with deployment info
- Document environment variables
- Create troubleshooting guide

## Cost Summary

**Railway Hobby Plan: $5/month**
- Includes: Backend + Frontend + PostgreSQL
- 8GB RAM per service (more than enough)
- Automatic scaling within credits
- Pay-as-you-go for overages (unlikely for 2 users)

## Quick Reference

| Phase | Task | Time |
|---|---|---|
| 1 | Docker setup | 1 hr |
| 2 | Railway account | 15 min |
| 3 | GitHub setup | 30 min |
| 4 | Railway infrastructure | 30 min |
| 5 | First deployment | 1 hr |
| 6 | GitHub Actions CI/CD | 45 min |
| 7 | Post-deployment | 30 min |
| **TOTAL** | | **~4.5 hours** |

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
