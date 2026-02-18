-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "page" INTEGER;

-- AlterTable
ALTER TABLE "Definition" ADD COLUMN     "page" INTEGER;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bodyEnglish" TEXT;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "page" INTEGER;
