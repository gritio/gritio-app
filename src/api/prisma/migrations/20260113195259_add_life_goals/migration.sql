-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "lifeGoalId" TEXT;

-- CreateTable
CREATE TABLE "LifeGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LifeGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LifeGoal_userId_idx" ON "LifeGoal"("userId");

-- CreateIndex
CREATE INDEX "Goal_lifeGoalId_idx" ON "Goal"("lifeGoalId");

-- AddForeignKey
ALTER TABLE "LifeGoal" ADD CONSTRAINT "LifeGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_lifeGoalId_fkey" FOREIGN KEY ("lifeGoalId") REFERENCES "LifeGoal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
