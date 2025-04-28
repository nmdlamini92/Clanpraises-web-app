/*
  Warnings:

  - Added the required column `index` to the `Definitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Definitions" ADD COLUMN     "index" INTEGER NOT NULL;
