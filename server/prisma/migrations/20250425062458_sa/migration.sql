/*
  Warnings:

  - You are about to drop the column `defDetails` on the `TrashCan_Definitions` table. All the data in the column will be lost.
  - Added the required column `body` to the `TrashCan_Definitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clan` to the `TrashCan_Definitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clanPraiseId` to the `TrashCan_Definitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comments` to the `TrashCan_Definitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews` to the `TrashCan_Definitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tribe` to the `TrashCan_Definitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrashCan_Definitions" DROP COLUMN "defDetails",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "clan" TEXT NOT NULL,
ADD COLUMN     "clanPraiseId" TEXT NOT NULL,
ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "reviews" TEXT NOT NULL,
ADD COLUMN     "tribe" TEXT NOT NULL;
