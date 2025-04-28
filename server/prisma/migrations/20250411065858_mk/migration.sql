/*
  Warnings:

  - A unique constraint covering the columns `[tribe]` on the table `Tribe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tribe_tribe_key" ON "Tribe"("tribe");
