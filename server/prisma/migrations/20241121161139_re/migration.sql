/*
  Warnings:

  - Added the required column `comment` to the `Reports_ClanPraise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Reports_ClanPraise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reports_ClanPraise" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
