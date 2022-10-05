/*
  Warnings:

  - You are about to drop the column `slink` on the `bookmarks` table. All the data in the column will be lost.
  - Added the required column `link` to the `bookmarks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "slink",
ADD COLUMN     "link" TEXT NOT NULL;
