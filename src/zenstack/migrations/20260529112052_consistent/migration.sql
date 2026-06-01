/*
  Warnings:

  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subsidyprogramconfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Configuration";

-- DropTable
DROP TABLE "Subsidyprogramconfig";

-- CreateTable
CREATE TABLE "DezConfig" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "versionName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "calculationConfig" JSONB NOT NULL,
    "foerderprogramme" JSONB NOT NULL,

    CONSTRAINT "DezConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DezConfig_versionName_key" ON "DezConfig"("versionName");
