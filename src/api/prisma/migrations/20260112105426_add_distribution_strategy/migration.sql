-- CreateEnum
CREATE TYPE "DistributionStrategy" AS ENUM ('SPREAD_EVENLY', 'EQUAL_DISTRIBUTION', 'FRONT_LOAD', 'PROGRESSIVE');

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "distributionStrategy" "DistributionStrategy" NOT NULL DEFAULT 'SPREAD_EVENLY',
ADD COLUMN     "finalTarget" DOUBLE PRECISION,
ADD COLUMN     "startValue" DOUBLE PRECISION;
