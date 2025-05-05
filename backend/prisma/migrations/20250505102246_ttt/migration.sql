/*
  Warnings:

  - You are about to alter the column `tableId` on the `FileReference` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `FileReference` MODIFY `tableId` INTEGER NOT NULL;
