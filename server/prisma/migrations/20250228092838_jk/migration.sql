/*
  Warnings:

  - You are about to drop the column `definitionID` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Definitions` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `updatedAt` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_definitionID_fkey";

-- DropForeignKey
ALTER TABLE "Definitions" DROP CONSTRAINT "Definitions_postId_fkey";

-- DropForeignKey
ALTER TABLE "Definitions" DROP CONSTRAINT "Definitions_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "definitionID",
DROP COLUMN "index",
ALTER COLUMN "updatedAt" SET NOT NULL;

-- DropTable
DROP TABLE "Definitions";

-- CreateTable
CREATE TABLE "Definition" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Definition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like_on_ClanPraise" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Like_on_ClanPraise_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Like_on_Definition" (
    "userId" TEXT NOT NULL,
    "definitionId" TEXT NOT NULL,

    CONSTRAINT "Like_on_Definition_pkey" PRIMARY KEY ("userId","definitionId")
);

-- AddForeignKey
ALTER TABLE "Definition" ADD CONSTRAINT "Definition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Definition" ADD CONSTRAINT "Definition_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Definition" ADD CONSTRAINT "Definition_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Definition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_on_ClanPraise" ADD CONSTRAINT "Like_on_ClanPraise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_on_ClanPraise" ADD CONSTRAINT "Like_on_ClanPraise_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_on_Definition" ADD CONSTRAINT "Like_on_Definition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_on_Definition" ADD CONSTRAINT "Like_on_Definition_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "Definition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
