CREATE TYPE "IssueCategory" AS ENUM ('POTHOLE', 'GARBAGE', 'STREETLIGHT', 'OBSTRUCTION', 'WATERLOGGING');
CREATE TYPE "IssueStatus" AS ENUM ('REPORTED', 'AI_ANALYZED', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'RESOLUTION_VERIFIED', 'CLOSED');

CREATE TABLE "Issue" (
  "id" TEXT NOT NULL, "publicId" TEXT NOT NULL, "category" "IssueCategory" NOT NULL,
  "description" TEXT, "imageUrl" TEXT NOT NULL, "latitude" DOUBLE PRECISION NOT NULL,
  "longitude" DOUBLE PRECISION NOT NULL, "address" TEXT, "severity" DOUBLE PRECISION,
  "confidence" INTEGER, "priority" INTEGER, "reportCount" INTEGER NOT NULL DEFAULT 1,
  "uniqueReporterCount" INTEGER NOT NULL DEFAULT 1, "status" "IssueStatus" NOT NULL DEFAULT 'REPORTED',
  "assignedTeam" TEXT, "aiSummary" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Report" (
  "id" TEXT NOT NULL, "issueId" TEXT NOT NULL, "imageUrl" TEXT NOT NULL, "note" TEXT,
  "latitude" DOUBLE PRECISION NOT NULL, "longitude" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "StatusEvent" (
  "id" TEXT NOT NULL, "issueId" TEXT NOT NULL, "status" "IssueStatus" NOT NULL, "note" TEXT,
  "actor" TEXT NOT NULL DEFAULT 'system', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "StatusEvent_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Resolution" (
  "id" TEXT NOT NULL, "issueId" TEXT NOT NULL, "afterImageUrl" TEXT, "verificationScore" INTEGER,
  "citizenConfirmed" BOOLEAN NOT NULL DEFAULT false, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Resolution_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Issue_publicId_key" ON "Issue"("publicId");
CREATE INDEX "Issue_status_idx" ON "Issue"("status");
CREATE INDEX "Issue_category_idx" ON "Issue"("category");
CREATE INDEX "Issue_latitude_longitude_idx" ON "Issue"("latitude", "longitude");
CREATE UNIQUE INDEX "Resolution_issueId_key" ON "Resolution"("issueId");
ALTER TABLE "Report" ADD CONSTRAINT "Report_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StatusEvent" ADD CONSTRAINT "StatusEvent_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Resolution" ADD CONSTRAINT "Resolution_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
