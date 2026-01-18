-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_store_owner_id_fkey";

-- AlterTable
ALTER TABLE "store" ALTER COLUMN "store_owner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_store_owner_id_fkey" FOREIGN KEY ("store_owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
