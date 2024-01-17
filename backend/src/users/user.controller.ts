import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { ActivateUserDTO } from './dto/ActivateUserDTO';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() data: CreateUserDTO) {
    const result = await this.userService.createUser(data);
    return result;
  }

  @Post('/activate')
  @HttpCode(200)
  async activateAccount(@Query() data: ActivateUserDTO) {
    const result = await this.userService.activateUser(data);
    return result;
  }
}
