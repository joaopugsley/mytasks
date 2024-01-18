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
import { FilterTaskDTO } from './dto/FilterTaskDTO';
import { TaskFilter } from './types/TaskFilter.type';
import { LoggerService } from '@common/services/logger/logger.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async getTasks(data: FilterTaskDTO, userData: JwtPayload) {
    // setup filter
    const filter: TaskFilter = {};

    if (data.title) {
      filter.title = {
        contains: data.title,
      };
    }

    if (data.status) {
      filter.status = data.status;
    }

    // query for user tasks
    const tasks = await this.prisma.task.findMany({
      where: {
        user_id: userData.id,
        ...filter,
      },
    });

    // paginate-it
    const page = Number(data.page); // current page
    const pageAmount = Number(data.amount); // amount per page
    const startIndex = (page - 1) * pageAmount; // start index
    const endIndex = startIndex + pageAmount; // end index

    const pageItems = tasks.slice(startIndex, endIndex);

    // return data
    return {
      page: page,
      total: Math.ceil(tasks.length / pageAmount),
      items: pageItems,
    };
  }

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

    // try create task
    try {
      const task = await this.prisma.task.create({
        data: {
          title: title,
          description: description,
          user_id: user.id,
        },
      });

      // log new task
      this.logger.log(
        userData.id,
        task.id,
        'created',
        `User ${userData.id} created new task ${task.id}, with title: ${title}`,
      );

      // return success
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

      // log task update
      this.logger.log(
        userData.id,
        task.id,
        'updated',
        `User ${userData.id} updated task ${task.id}`,
        {
          title: data.title,
          description: data.description,
          status: data.status,
        },
      );

      return {
        success: true,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while updating the task, try again later',
      );
    }
  }

  async deleteTask(id: number, userData: JwtPayload) {
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

    // try delete the task
    try {
      await this.prisma.task.delete({
        where: {
          id: task.id,
        },
      });

      // log new task
      this.logger.log(
        userData.id,
        task.id,
        'deleted',
        `User ${userData.id} deleted task ${task.id}`,
      );

      return {
        success: true,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while deleting the task, try again later',
      );
    }
  }
}
