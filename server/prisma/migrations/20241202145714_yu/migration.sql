-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like_on_ClanPraise" DROP CONSTRAINT "Like_on_ClanPraise_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reports_ClanPraise" DROP CONSTRAINT "Reports_ClanPraise_userId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports_ClanPraise" ADD CONSTRAINT "Reports_ClanPraise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_on_ClanPraise" ADD CONSTRAINT "Like_on_ClanPraise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;
