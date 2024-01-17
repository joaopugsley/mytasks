import { Module } from '@nestjs/common';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { CryptoService } from '@common/services/crypto/crypto.service';
import { EmailService } from '@common/services/email/email.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [PrismaService, CryptoService, EmailService, TaskService],
})
export class TaskModule {}
