-- CreateTable
CREATE TABLE "JournalPage" (
    "id" TEXT NOT NULL,
    "notebookId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JournalPage_notebookId_idx" ON "JournalPage"("notebookId");

-- CreateIndex
CREATE INDEX "JournalPage_notebookId_date_idx" ON "JournalPage"("notebookId", "date");

-- AddForeignKey
ALTER TABLE "JournalPage" ADD CONSTRAINT "JournalPage_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "JournalSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DataMigration: carry any existing notebook content over as its first page,
-- so switching from "one blob per notebook" to "dated pages" loses nothing.
INSERT INTO "JournalPage" ("id", "notebookId", "date", "content", "createdAt", "updatedAt")
SELECT
  substr(md5(random()::text || clock_timestamp()::text || "id"), 1, 25),
  "id",
  "updatedAt",
  "content",
  "updatedAt",
  "updatedAt"
FROM "JournalSection"
WHERE "content" IS NOT NULL AND "content" <> '';

-- AlterTable
ALTER TABLE "JournalSection" DROP COLUMN "content";
