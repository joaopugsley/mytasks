import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/CreateTaskDTO';
import { RequireAuth } from '@auth/decorators/auth.decorator';
import { TaskService } from './task.service';
import { User } from '@auth/decorators/user.decorator';
import { JwtPayload } from '@auth/types/JwtPayload.type';
import { UpdateTaskDTO } from './dto/UpdateTaskDTO';
import { FilterTaskDTO } from './dto/FilterTaskDTO';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  @RequireAuth()
  async getTasks(@Query() data: FilterTaskDTO, @User() user: JwtPayload) {
    const result = await this.taskService.getTasks(data, user);
    return result;
  }

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
