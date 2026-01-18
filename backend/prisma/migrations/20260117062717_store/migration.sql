/*
  Warnings:

  - You are about to drop the column `shopId` on the `rating` table. All the data in the column will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `storeId` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_shopId_fkey";

-- AlterTable
ALTER TABLE "rating" DROP COLUMN "shopId",
ADD COLUMN     "storeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Shop";

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
