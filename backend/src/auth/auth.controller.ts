import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginUserDTO } from './dto/LoginUserDTO';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async createUser(@Body() data: LoginUserDTO) {
    const result = await this.authService.login(data);
    return result;
  }
}
