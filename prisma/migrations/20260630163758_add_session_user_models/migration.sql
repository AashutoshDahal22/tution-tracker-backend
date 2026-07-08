/*
  Warnings:

  - Added the required column `userId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BillingType" AS ENUM ('HOURLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "billingType" "BillingType" NOT NULL DEFAULT 'HOURLY',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "hourlyRate" DROP NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "duration" INTEGER,
    "notes" TEXT,
    "status" "SessionStatus" NOT NULL DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Session_studentId_idx" ON "Session"("studentId");

-- CreateIndex
CREATE INDEX "Student_userId_idx" ON "Student"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
