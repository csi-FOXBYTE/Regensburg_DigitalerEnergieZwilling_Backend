/*
  Warnings:

  - You are about to drop the `DezConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DezConfig";

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "versionName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "calculationConfig" TEXT NOT NULL,
    "foerderprogramme" TEXT NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_versionName_key" ON "Config"("versionName");
