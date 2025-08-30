/*
  Warnings:

  - You are about to drop the `Feeback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Feeback";

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
