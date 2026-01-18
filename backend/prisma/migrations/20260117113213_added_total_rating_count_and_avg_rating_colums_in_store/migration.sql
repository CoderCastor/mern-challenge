-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "avg_rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_rating_count" INTEGER NOT NULL DEFAULT 0;
