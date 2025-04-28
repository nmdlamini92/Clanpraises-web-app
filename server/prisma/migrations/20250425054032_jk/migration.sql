/*
  Warnings:

  - You are about to drop the column `body` on the `TrashCan_ClanPraises` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TrashCan_ClanPraises` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `TrashCan_ClanPraises` table. All the data in the column will be lost.
  - You are about to drop the column `original_ID` on the `TrashCan_ClanPraises` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `TrashCan_ClanPraises` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TrashCan_ClanPraises` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `TrashCan_ClanPraises` table. All the data in the column will be lost.
  - Added the required column `clan` to the `TrashCan_ClanPraises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postDetails` to the `TrashCan_ClanPraises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrashCan_ClanPraises" DROP COLUMN "body",
DROP COLUMN "createdAt",
DROP COLUMN "likes",
DROP COLUMN "original_ID",
DROP COLUMN "title",
DROP COLUMN "userId",
DROP COLUMN "views",
ADD COLUMN     "clan" TEXT NOT NULL,
ADD COLUMN     "postDetails" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TrashCan_Definitions" (
    "id" TEXT NOT NULL,
    "defDetails" TEXT NOT NULL,

    CONSTRAINT "TrashCan_Definitions_pkey" PRIMARY KEY ("id")
);
