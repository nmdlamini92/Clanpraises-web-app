/*
  Warnings:

  - The primary key for the `Views` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guestId` on the `Views` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Views` table. All the data in the column will be lost.
  - Added the required column `viewee` to the `Views` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_userId_fkey";

-- AlterTable
ALTER TABLE "Views" DROP CONSTRAINT "Views_pkey",
DROP COLUMN "guestId",
DROP COLUMN "userId",
ADD COLUMN     "viewee" TEXT NOT NULL,
ADD CONSTRAINT "Views_pkey" PRIMARY KEY ("postId");
