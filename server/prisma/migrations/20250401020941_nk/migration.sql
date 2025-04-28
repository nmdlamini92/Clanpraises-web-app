-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "tribeId" TEXT;

-- CreateTable
CREATE TABLE "Tribe" (
    "id" TEXT NOT NULL,
    "tribe" TEXT NOT NULL,
    "praises_Plural" TEXT NOT NULL DEFAULT 'clanpraises',
    "praises_Singular" TEXT,

    CONSTRAINT "Tribe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_tribeId_fkey" FOREIGN KEY ("tribeId") REFERENCES "Tribe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
