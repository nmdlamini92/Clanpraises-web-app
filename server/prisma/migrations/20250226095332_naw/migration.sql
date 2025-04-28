-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "definitionID" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_definitionID_fkey" FOREIGN KEY ("definitionID") REFERENCES "Definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
