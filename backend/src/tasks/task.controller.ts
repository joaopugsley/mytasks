import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/CreateTaskDTO';
import { RequireAuth } from '@auth/decorators/auth.decorator';
import { TaskService } from './task.service';
import { User } from '@auth/decorators/user.decorator';
import { JwtPayload } from '@auth/types/JwtPayload.type';
import { UpdateTaskDTO } from './dto/UpdateTaskDTO';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  @RequireAuth()
  async createTask(@Body() data: CreateTaskDTO, @User() user: JwtPayload) {
    const result = await this.taskService.createTask(data, user);
    return result;
  }

  @Patch('/:id')
  @RequireAuth()
  async updateTask(
    @Param('id') id: number,
    @Body() data: UpdateTaskDTO,
    @User() user: JwtPayload,
  ) {
    const result = await this.taskService.updateTask(id, data, user);
    return result;
  }
}
