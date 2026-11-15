/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User1` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Made the column `praises_Plural` on table `Tribe` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tribe" ALTER COLUMN "praises_Plural" SET NOT NULL,
ALTER COLUMN "praises_Plural" SET DEFAULT 'clanpraises',
ALTER COLUMN "praises_Singular" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "email" VARCHAR(20),
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User1_username_key" ON "User1"("username");
