/*
  Warnings:

  - Added the required column `index` to the `Definition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Definition" ADD COLUMN     "index" INTEGER NOT NULL;
