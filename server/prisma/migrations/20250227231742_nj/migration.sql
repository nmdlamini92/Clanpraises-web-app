/*
  Warnings:

  - Made the column `createdAt` on table `Definitions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `definition` on table `Definitions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "index" INTEGER,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Definitions" ADD COLUMN     "rating" INTEGER,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "definition" SET NOT NULL;
