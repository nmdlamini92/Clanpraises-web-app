/*
  Warnings:

  - You are about to drop the `Like_on_ClanPraise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like_on_ClanPraise" DROP CONSTRAINT "Like_on_ClanPraise_postId_fkey";

-- DropForeignKey
ALTER TABLE "Like_on_ClanPraise" DROP CONSTRAINT "Like_on_ClanPraise_userId_fkey";

-- DropTable
DROP TABLE "Like_on_ClanPraise";

-- CreateTable
CREATE TABLE "Definitions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Definitions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Definitions" ADD CONSTRAINT "Definitions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Definitions" ADD CONSTRAINT "Definitions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
