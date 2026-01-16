-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'USER', 'STORE_OWNER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
