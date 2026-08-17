-- CreateTable
CREATE TABLE "JournalSection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#805232',
    "content" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JournalSection_userId_idx" ON "JournalSection"("userId");

-- AddForeignKey
ALTER TABLE "JournalSection" ADD CONSTRAINT "JournalSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
