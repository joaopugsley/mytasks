import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { CryptoService } from '@common/services/crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/LoginUserDTO';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private crypto: CryptoService,
    private jwt: JwtService,
  ) {}

  async login(data: LoginUserDTO) {
    // trim username to remove blankspaces at the start or end
    let username = data.username.trim();

    // lower case username before checking for matches
    username = username.toLowerCase();

    // check if user exists
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    // throw BadRequest if user doesnt exists
    if (!user) {
      // we gonna use this message for almost all verifications as it is a authflow good practice for security reasons
      throw new BadRequestException('Invalid username or password');
    }

    // throw BadRequest with custom message if the user is not activated
    if (!user.active) {
      throw new BadRequestException(
        'You should activate your account before login',
      );
    }

    // hash password before compare
    let password = this.crypto.hashMD5(data.password).toUpperCase();
    password = this.crypto.getLoginHash(password, process.env.STATIC_KEY);

    // compare password
    if (!(await this.crypto.compareBcrypt(password, user.password))) {
      throw new BadRequestException('Invalid username or password');
    }

    // create payload
    const payload = {
      username: user.username,
      nickname: user.nickname,
      subject: user.id,
    };

    // generate jwt token
    const jwtToken = await this.jwt.signAsync(payload);
    return {
      access_token: jwtToken,
    };
  }
}
