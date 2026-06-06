-- DropForeignKey (only if MonthlyGoal table exists)
ALTER TABLE IF EXISTS "MonthlyGoal" DROP CONSTRAINT IF EXISTS "MonthlyGoal_goalId_fkey";

-- DropTable (only if exists - local has already dropped it)
DROP TABLE IF EXISTS "MonthlyGoal";

-- AlterEnum: Update GoalStatus to add COMPLETED, AT_RISK; remove AHEAD
-- First, convert any rows with status='AHEAD' to 'ON_TRACK' for safe migration
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'AHEAD' AND enumtypid = 'public."GoalStatus"'::regtype) THEN
    UPDATE "Goal" SET "status" = 'ON_TRACK' WHERE "status" = 'AHEAD';
  END IF;
END $$;

-- Now perform the enum swap (only if AHEAD still exists or new values are missing)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'AHEAD' AND enumtypid = 'public."GoalStatus"'::regtype)
     OR NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'COMPLETED' AND enumtypid = 'public."GoalStatus"'::regtype)
     OR NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'AT_RISK' AND enumtypid = 'public."GoalStatus"'::regtype) THEN
    CREATE TYPE "GoalStatus_new" AS ENUM ('COMPLETED', 'ON_TRACK', 'AT_RISK', 'BEHIND');
    ALTER TABLE "Goal" ALTER COLUMN "status" DROP DEFAULT;
    ALTER TABLE "Goal" ALTER COLUMN "status" TYPE "GoalStatus_new" USING ("status"::text::"GoalStatus_new");
    ALTER TYPE "GoalStatus" RENAME TO "GoalStatus_old";
    ALTER TYPE "GoalStatus_new" RENAME TO "GoalStatus";
    DROP TYPE "GoalStatus_old";
    ALTER TABLE "Goal" ALTER COLUMN "status" SET DEFAULT 'ON_TRACK';
  END IF;
END $$;
