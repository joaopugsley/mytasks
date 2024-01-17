-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `task_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
