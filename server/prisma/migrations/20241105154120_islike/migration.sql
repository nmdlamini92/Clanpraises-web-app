/*
  Warnings:

  - You are about to drop the `Like_ClanPraise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like_ClanPraise" DROP CONSTRAINT "Like_ClanPraise_postId_fkey";

-- DropForeignKey
ALTER TABLE "Like_ClanPraise" DROP CONSTRAINT "Like_ClanPraise_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isPostLikeByMe" BOOLEAN;

-- DropTable
DROP TABLE "Like_ClanPraise";

-- CreateTable
CREATE TABLE "Like_on_ClanPraise" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Like_on_ClanPraise_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "Like_on_ClanPraise" ADD CONSTRAINT "Like_on_ClanPraise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_on_ClanPraise" ADD CONSTRAINT "Like_on_ClanPraise_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
