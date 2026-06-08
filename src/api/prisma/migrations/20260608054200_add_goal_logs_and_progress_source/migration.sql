-- CreateEnum
CREATE TYPE "ProgressSource" AS ENUM ('TASKS', 'LOGS');

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "progressSource" "ProgressSource" NOT NULL DEFAULT 'TASKS';

-- CreateTable
CREATE TABLE "GoalLog" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoalLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GoalLog_goalId_loggedAt_idx" ON "GoalLog"("goalId", "loggedAt");

-- AddForeignKey
ALTER TABLE "GoalLog" ADD CONSTRAINT "GoalLog_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Force LOGS mode for all existing weight goals
UPDATE "Goal" SET "progressSource" = 'LOGS' WHERE "unit" = 'Kilogram';
