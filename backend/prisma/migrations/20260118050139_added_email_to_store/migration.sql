/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "store" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "store_email_key" ON "store"("email");
