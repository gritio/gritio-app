# Frontend-Backend Integration Guide

## Overview
The HouseholdTracker application now has full integration between the React frontend and Nest.js backend for the Goal creation service.

## Architecture

### Frontend (React)
- **Location**: `/src/app`
- **API Service**: `/src/app/services/api.ts` - Centralized API client using Axios
- **Components**: Updated `AddGoalModal.tsx` to call backend API
- **State**: Goals are now fetched from and saved to the backend database

### Backend (Nest.js)
- **Location**: `/src/api`
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth0 JWT verification on all routes
- **API Endpoints**: RESTful endpoints for Goals, Monthly Goals, and Tasks

## Integration Flow: Creating a Goal

### Frontend Flow (AddGoalModal.tsx)
```
1. User fills form (title, area, unit, weight/count/time fields)
2. User clicks "Add Goal"
3. handleSubmit() → Builds payload with goal data
4. onSave() → Calls goalsApi.createGoal()
5. API call sent to backend with JWT token
6. Response → Goal added to React state
7. Modal closes, goals list updates
```

### Backend Flow (Goals Service)
```
1. POST /goals request with JWT token
2. JwtAuthGuard validates token → Extracts userId
3. GoalsController.createGoal() → Receives DTO
4. GoalsService.createGoal() → Creates goal + related type (Weight/Count/Time)
5. Prisma saves to database
6. Returns created goal with all relations
7. Frontend receives goal and updates state
```

## API Service (`/src/app/services/api.ts`)

### Goals API
```typescript
goalsApi.createGoal(goalData)      // Create new goal
goalsApi.getGoals()                // Get all user goals
goalsApi.getGoal(id)               // Get specific goal
goalsApi.updateGoal(id, data)      // Update goal
goalsApi.deleteGoal(id)            // Delete goal
```

### Monthly Goals API
```typescript
monthlyGoalsApi.createMonthlyGoal(data)    // Create monthly goal
monthlyGoalsApi.getMonthlyGoalsByGoal(id)  // Get by goal
monthlyGoalsApi.updateMonthlyGoal(id, data)// Update
monthlyGoalsApi.deleteMonthlyGoal(id)      // Delete
```

### Tasks API
```typescript
tasksApi.createTask(data)                  // Create task
tasksApi.getTasksByMonthlyGoal(id)         // Get by monthly goal
tasksApi.updateTask(id, data)              // Update
tasksApi.logCompletion(id, date, value)    // Log completion
tasksApi.getHistory(id, days)              // Get completion history
tasksApi.deleteTask(id)                    // Delete
```

## Request/Response Examples

### Create Goal Request
```javascript
POST http://localhost:3000/goals
Headers:
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json

Body:
{
  "title": "Reach Target Weight",
  "area": "Health",
  "unit": "Kilogram",
  "yearlyMeasure": "87",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31",
  "remarks": "Focus on consistency",
  "weightGoal": {
    "startWeight": 85,
    "currentWeight": 80,
    "targetWeight": 75
  }
}
```

### Create Goal Response
```json
{
  "id": "clz...",
  "userId": "clz...",
  "title": "Reach Target Weight",
  "area": "Health",
  "unit": "Kilogram",
  "yearlyMeasure": "87",
  "startDate": "2025-01-01T00:00:00.000Z",
  "endDate": "2025-12-31T00:00:00.000Z",
  "target": 100,
  "progress": 0,
  "status": "ON_TRACK",
  "remarks": "Focus on consistency",
  "createdAt": "2025-12-29T16:45:00.000Z",
  "updatedAt": "2025-12-29T16:45:00.000Z",
  "weightGoal": {
    "id": "clz...",
    "goalId": "clz...",
    "startWeight": 85,
    "currentWeight": 80,
    "targetWeight": 75
  },
  "countGoal": null,
  "timeGoal": null
}
```

## Configuration

### Backend (.env)
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/household_tracker?schema=public"
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
JWT_SECRET=your-jwt-secret
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:3000
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=household-tracker-api
```

## Running the Application

### Backend
```bash
cd src/api
pnpm install
pnpm start:dev
# Runs on http://localhost:3000
```

### Frontend
```bash
cd src/app
npm install
npm start
# Runs on http://localhost:3000 (or next available port)
```

## Error Handling

### Frontend
- Errors are caught in AddGoalModal and displayed to user
- Network errors, validation errors, and server errors are shown
- Loading state prevents duplicate submissions

### Backend
- Prisma errors are caught and logged
- Invalid input is validated via DTO decorators
- 400 Bad Request for validation errors
- 401 Unauthorized for missing/invalid JWT
- 500 Internal Server Error for unexpected issues

## Next Steps

To integrate other services (Monthly Goals, Tasks), follow the same pattern:

1. Create API calls in `services/api.ts`
2. Update components to use new API calls
3. Handle loading and error states
4. Update tests to mock API responses

## Database Schema

The goal is stored with one of three types:
- **WeightGoal**: For weight tracking (start, current, target weights)
- **CountGoal**: For count-based goals (target count)
- **TimeGoal**: For time-based goals (target hours, minutes)

Each goal links to:
- **User**: Who owns the goal
- **MonthlyGoal**: Monthly breakdowns
- **Task**: Daily/weekly subtasks
- **CompletionRecord**: Completion history

## Authentication Flow

1. User logs in via Auth0 (handled by frontend)
2. Frontend receives JWT token
3. Token stored in localStorage
4. API service adds token to Authorization header
5. Backend JWT Guard validates token
6. Request processed with userId from token
