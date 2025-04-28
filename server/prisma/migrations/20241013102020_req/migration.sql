/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User1` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User1_email_key" ON "User1"("email");
