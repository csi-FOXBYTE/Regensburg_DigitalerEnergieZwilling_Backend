-- CreateTable
CREATE TABLE "Subsidyprogram" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version_name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "payload" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Subsidyprogram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version_name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "config" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subsidyprogram_version_name_key" ON "Subsidyprogram"("version_name");

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_version_name_key" ON "Configuration"("version_name");
