/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User1` will be added. If there are existing duplicate values, this will fail.
  - Made the column `tribe` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "tribe" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User1_username_key" ON "User1"("username");
