/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT 'TEMP_PASSWORD';
ALTER TABLE `user` ADD COLUMN `telefono` VARCHAR(191) NOT NULL DEFAULT '0000000000';
