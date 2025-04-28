-- DropForeignKey
ALTER TABLE "Like_on_ClanPraise" DROP CONSTRAINT "Like_on_ClanPraise_userId_fkey";

-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_userId_fkey";

-- AddForeignKey
ALTER TABLE "Like_on_ClanPraise" ADD CONSTRAINT "Like_on_ClanPraise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
