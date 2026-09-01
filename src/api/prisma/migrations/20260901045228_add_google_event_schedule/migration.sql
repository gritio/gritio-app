-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "googleEventAllDay" BOOLEAN,
ADD COLUMN     "googleEventRecurrence" TEXT,
ADD COLUMN     "googleEventStart" TIMESTAMP(3);
