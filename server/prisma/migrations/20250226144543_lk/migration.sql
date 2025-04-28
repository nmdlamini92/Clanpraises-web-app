/*
  Warnings:

  - You are about to drop the column `definitionID` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `Definitions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_definitionID_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "definitionID",
ADD COLUMN     "definitionIndex" INTEGER;

-- AlterTable
ALTER TABLE "Definitions" DROP CONSTRAINT "Definitions_pkey",
ADD CONSTRAINT "Definitions_pkey" PRIMARY KEY ("postId", "index");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_definitionIndex_fkey" FOREIGN KEY ("postId", "definitionIndex") REFERENCES "Definitions"("postId", "index") ON DELETE CASCADE ON UPDATE CASCADE;
