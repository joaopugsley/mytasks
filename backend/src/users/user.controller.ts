import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDTO,
  ): Promise<number> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }
}
