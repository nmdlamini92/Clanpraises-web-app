/*
  Warnings:

  - You are about to drop the column `forbidden` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "forbidden",
ADD COLUMN     "forbidden_foods" TEXT;
