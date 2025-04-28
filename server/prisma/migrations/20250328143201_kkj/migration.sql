-- CreateTable
CREATE TABLE "DisLike_on_Definition" (
    "userId" TEXT NOT NULL,
    "definitionId" TEXT NOT NULL,

    CONSTRAINT "DisLike_on_Definition_pkey" PRIMARY KEY ("userId","definitionId")
);

-- CreateTable
CREATE TABLE "DisLike_on_Review" (
    "userId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,

    CONSTRAINT "DisLike_on_Review_pkey" PRIMARY KEY ("userId","reviewId")
);

-- CreateTable
CREATE TABLE "DisLike_on_Comment" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "DisLike_on_Comment_pkey" PRIMARY KEY ("userId","commentId")
);

-- AddForeignKey
ALTER TABLE "DisLike_on_Definition" ADD CONSTRAINT "DisLike_on_Definition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisLike_on_Definition" ADD CONSTRAINT "DisLike_on_Definition_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "Definition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisLike_on_Review" ADD CONSTRAINT "DisLike_on_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisLike_on_Review" ADD CONSTRAINT "DisLike_on_Review_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisLike_on_Comment" ADD CONSTRAINT "DisLike_on_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisLike_on_Comment" ADD CONSTRAINT "DisLike_on_Comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
