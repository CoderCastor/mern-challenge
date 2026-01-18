/*
  Warnings:

  - A unique constraint covering the columns `[storeId,userId]` on the table `rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rating_storeId_userId_key" ON "rating"("storeId", "userId");
