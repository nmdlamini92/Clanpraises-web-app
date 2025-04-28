-- CreateTable
CREATE TABLE "MobComment" (
    "message" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "clan" TEXT NOT NULL,

    CONSTRAINT "MobComment_pkey" PRIMARY KEY ("message")
);
