/*
  Warnings:

  - You are about to drop the `MobComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MobComment";

-- CreateTable
CREATE TABLE "Mobcomment" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "clan" TEXT NOT NULL,

    CONSTRAINT "Mobcomment_pkey" PRIMARY KEY ("id")
);
