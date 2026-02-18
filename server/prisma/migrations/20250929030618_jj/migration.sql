-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "forbidden" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "related" TEXT;

-- AlterTable
ALTER TABLE "User1" ALTER COLUMN "username" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Follwings_on_Post" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Follwings_on_Post_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "Follwings_on_Post" ADD CONSTRAINT "Follwings_on_Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follwings_on_Post" ADD CONSTRAINT "Follwings_on_Post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
