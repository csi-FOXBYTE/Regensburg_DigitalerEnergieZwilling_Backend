/*
  Warnings:

  - You are about to drop the column `foerderprogramme` on the `Config` table. All the data in the column will be lost.
  - Added the required column `subsidies` to the `Config` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Config" DROP COLUMN "foerderprogramme",
ADD COLUMN     "subsidies" TEXT NOT NULL;
