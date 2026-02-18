/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `User1` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebookId]` on the table `User1` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User1" ADD COLUMN     "facebookId" TEXT,
ADD COLUMN     "googleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User1_googleId_key" ON "User1"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User1_facebookId_key" ON "User1"("facebookId");
