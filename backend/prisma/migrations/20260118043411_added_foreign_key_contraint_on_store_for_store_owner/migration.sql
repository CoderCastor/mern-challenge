/*
  Warnings:

  - A unique constraint covering the columns `[store_owner_id]` on the table `store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `store_owner_id` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "store" ADD COLUMN     "store_owner_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "store_store_owner_id_key" ON "store"("store_owner_id");

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_store_owner_id_fkey" FOREIGN KEY ("store_owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
