-- CreateTable
CREATE TABLE "TaskMonthAggregation" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "totalValue" DECIMAL(10,2) NOT NULL,
    "daysWithActivity" INTEGER NOT NULL DEFAULT 0,
    "target" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskMonthAggregation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TaskMonthAggregation_taskId_idx" ON "TaskMonthAggregation"("taskId");

-- CreateIndex
CREATE INDEX "TaskMonthAggregation_year_month_idx" ON "TaskMonthAggregation"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "TaskMonthAggregation_taskId_year_month_key" ON "TaskMonthAggregation"("taskId", "year", "month");

-- AddForeignKey
ALTER TABLE "TaskMonthAggregation" ADD CONSTRAINT "TaskMonthAggregation_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
