-- Drop the `area` column from Goal (data loss intentional, field no longer used)
ALTER TABLE "Goal" DROP COLUMN "area";

-- CreateTable: PercentageGoal sub-model for adherence-target goals
CREATE TABLE "PercentageGoal" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "targetPercent" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PercentageGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PercentageGoal_goalId_key" ON "PercentageGoal"("goalId");

-- AddForeignKey
ALTER TABLE "PercentageGoal" ADD CONSTRAINT "PercentageGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
