/*
  Warnings:

  - You are about to drop the `Subsidyprogram` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Subsidyprogram";

-- CreateTable
CREATE TABLE "Subsidyprogramconfig" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version_name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "payload" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Subsidyprogramconfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subsidyprogramconfig_version_name_key" ON "Subsidyprogramconfig"("version_name");
