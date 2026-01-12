-- AlterTable
ALTER TABLE "User" ADD COLUMN "dob" TIMESTAMP(3),
ADD COLUMN "phone" TEXT,
ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "emailVerificationToken" TEXT,
ADD COLUMN "emailVerificationExpires" TIMESTAMP(3),
ALTER COLUMN "auth0Id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerificationToken_key" ON "User"("emailVerificationToken");
