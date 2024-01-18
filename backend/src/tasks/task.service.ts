import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { CreateTaskDTO } from './dto/CreateTaskDTO';
import { JwtPayload } from '@auth/types/JwtPayload.type';
import { UpdateTaskDTO } from './dto/UpdateTaskDTO';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDTO, userData: JwtPayload) {
    // remove blankspaces at the start or end of the title
    const title = data.title.trim();

    // extract description from dto
    const description = data.description;

    // query for user
    const user = await this.prisma.user.findFirst({
      where: {
        id: userData.id,
      },
    });

    // throw 'Unauthorized' cuz user doesnt exists
    if (!user) {
      throw new UnauthorizedException();
    }

    //try create task
    try {
      const task = await this.prisma.task.create({
        data: {
          title: title,
          description: description,
          user_id: user.id,
        },
      });
      return {
        success: true,
        task: task.id,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while creating your task, try again later',
      );
    }
  }

  async updateTask(id: number, data: UpdateTaskDTO, userData: JwtPayload) {
    // query for the task
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
        user_id: userData.id,
      },
    });

    // throw 'NotFound' cuz task doesnt exists
    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    // update the task with the new data from UpdateTaskDTO
    try {
      await this.prisma.task.update({
        where: {
          id: id,
        },
        data: {
          title: data.title !== undefined ? data.title.trim() : task.title,
          description:
            data.description !== undefined // if data.description is NOT undefined
              ? data.description.trim() // set it to data.description
              : task.description, // otherwise, maintain the current value
          status: data.status !== undefined ? data.status : task.status,
        },
      });

      return {
        success: true,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while updating the task, try again later',
      );
    }
  }
}
