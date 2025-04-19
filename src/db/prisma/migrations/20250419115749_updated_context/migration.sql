/*
  Warnings:

  - You are about to drop the column `description` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the `SourceCodeEmbedding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Repository_url_key";

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "description",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "SourceCodeEmbedding";

-- CreateTable
CREATE TABLE "Context" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Context_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Context" ADD CONSTRAINT "Context_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
