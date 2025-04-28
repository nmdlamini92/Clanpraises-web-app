-- CreateTable
CREATE TABLE "Like_ClanPraise" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Like_ClanPraise_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Views" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "guestId" TEXT,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "Like_ClanPraise" ADD CONSTRAINT "Like_ClanPraise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_ClanPraise" ADD CONSTRAINT "Like_ClanPraise_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
