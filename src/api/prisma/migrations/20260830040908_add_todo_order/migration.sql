-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Todo_userId_order_idx" ON "Todo"("userId", "order");
