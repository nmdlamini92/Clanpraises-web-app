-- CreateTable
CREATE TABLE "User1" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "tribe" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User1_pkey" PRIMARY KEY ("id")
);
