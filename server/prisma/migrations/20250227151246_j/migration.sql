/*
  Warnings:

  - You are about to drop the column `definitionIndex` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `Definitions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Definitions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_definitionIndex_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "definitionIndex",
ADD COLUMN     "definitionID" TEXT;

-- AlterTable
ALTER TABLE "Definitions" DROP CONSTRAINT "Definitions_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Definitions_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_definitionID_fkey" FOREIGN KEY ("definitionID") REFERENCES "Definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
