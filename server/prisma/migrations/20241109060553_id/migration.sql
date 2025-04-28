/*
  Warnings:

  - You are about to drop the column `viewee` on the `Views` table. All the data in the column will be lost.
  - Added the required column `vieweeId` to the `Views` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Views" DROP COLUMN "viewee",
ADD COLUMN     "vieweeId" TEXT NOT NULL;
