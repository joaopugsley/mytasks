import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { CryptoService } from '@common/services/crypto/crypto.service';
import { EmailService } from '@common/services/email/email.service';
import { CreateTaskDTO } from './dto/CreateTaskDTO';
import { JwtPayload } from '@auth/types/JwtPayload.type';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private crypto: CryptoService,
    private email: EmailService,
  ) {}

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
        'An error while creating your task occurred, try again later',
      );
    }
  }
}
