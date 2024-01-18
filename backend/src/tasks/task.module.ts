import { Module } from '@nestjs/common';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [PrismaService, TaskService],
})
export class TaskModule {}
