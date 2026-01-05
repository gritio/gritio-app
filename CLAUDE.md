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

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
