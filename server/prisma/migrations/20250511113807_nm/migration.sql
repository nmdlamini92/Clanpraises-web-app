-- CreateTable
CREATE TABLE "current_Most_Popular_Today" (
    "id" TEXT NOT NULL,
    "clanPraiseId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "current_Most_Popular_Today_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feeback" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feeback_pkey" PRIMARY KEY ("id")
);
