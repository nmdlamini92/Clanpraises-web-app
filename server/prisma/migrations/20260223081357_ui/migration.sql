-- DropIndex
DROP INDEX "User1_username_key";

-- AlterTable
ALTER TABLE "Tribe" ALTER COLUMN "praises_Plural" DROP NOT NULL,
ALTER COLUMN "praises_Plural" DROP DEFAULT,
ALTER COLUMN "praises_Singular" SET DEFAULT 'clanpraises';
