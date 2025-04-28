/*
  Warnings:

  - Changed the type of `likes` on the `TrashCan_ClanPraises` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `views` on the `TrashCan_ClanPraises` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TrashCan_ClanPraises" DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER NOT NULL,
DROP COLUMN "views",
ADD COLUMN     "views" INTEGER NOT NULL;
