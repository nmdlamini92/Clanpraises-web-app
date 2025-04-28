-- CreateTable
CREATE TABLE "Reports_ClanPraise" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Reports_ClanPraise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reports_ClanPraise" ADD CONSTRAINT "Reports_ClanPraise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports_ClanPraise" ADD CONSTRAINT "Reports_ClanPraise_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
