-- AlterTable
ALTER TABLE `UploadFile` ADD COLUMN `size` INTEGER NULL;

-- CreateTable
CREATE TABLE `FileReference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tableName` VARCHAR(191) NOT NULL,
    `tableId` VARCHAR(191) NOT NULL,
    `fileLabel` VARCHAR(191) NOT NULL,
    `fileId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FileReference_tableName_tableId_idx`(`tableName`, `tableId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FileReference` ADD CONSTRAINT `FileReference_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `UploadFile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
