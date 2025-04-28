/*
  Warnings:

  - You are about to drop the column `postDetails` on the `TrashCan_ClanPraises` table. All the data in the column will be lost.
  - Added the required column `body` to the `TrashCan_ClanPraises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comments` to the `TrashCan_ClanPraises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `definitions` to the `TrashCan_ClanPraises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews` to the `TrashCan_ClanPraises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrashCan_ClanPraises" DROP COLUMN "postDetails",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "definitions" TEXT NOT NULL,
ADD COLUMN     "reviews" TEXT NOT NULL;
