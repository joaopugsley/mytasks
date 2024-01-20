/*
  Warnings:

  - The values [Archived] on the enum `task_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('Pending', 'InProgress', 'Completed') NOT NULL DEFAULT 'Pending';
