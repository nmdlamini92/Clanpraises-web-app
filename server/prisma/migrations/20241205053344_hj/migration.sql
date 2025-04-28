-- CreateTable
CREATE TABLE "TrashCan_ClanPraises" (
    "id" TEXT NOT NULL,
    "original_ID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tribe" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "likes" TEXT NOT NULL,
    "views" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrashCan_ClanPraises_pkey" PRIMARY KEY ("id")
);
