/*
  Warnings:

  - You are about to drop the column `hourlyRate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentCode]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentCode` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "hourlyRate",
DROP COLUMN "isActive",
ADD COLUMN     "rate" DOUBLE PRECISION,
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "studentCode" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_status_idx" ON "Session"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentCode_key" ON "Student"("studentCode");

-- CreateIndex
CREATE INDEX "Student_status_idx" ON "Student"("status");

-- CreateIndex
CREATE INDEX "Student_studentCode_idx" ON "Student"("studentCode");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
