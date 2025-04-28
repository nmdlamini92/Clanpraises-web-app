/*
  Warnings:

  - The required column `tribe` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "tribe" TEXT NULL;

