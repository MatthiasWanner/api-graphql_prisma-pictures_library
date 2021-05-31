/*
  Warnings:

  - You are about to drop the column `albumId` on the `Picture` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_albumId_fkey";

-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "albumId";

-- CreateTable
CREATE TABLE "_AlbumToPicture" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToPicture_AB_unique" ON "_AlbumToPicture"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToPicture_B_index" ON "_AlbumToPicture"("B");

-- AddForeignKey
ALTER TABLE "_AlbumToPicture" ADD FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToPicture" ADD FOREIGN KEY ("B") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
