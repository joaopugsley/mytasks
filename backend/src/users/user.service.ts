import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { CryptoService } from '@common/services/crypto/crypto.service';
import { EmailService } from '@common/services/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private crypto: CryptoService,
    private email: EmailService,
  ) {}

  async createUser(data: CreateUserDTO): Promise<number> {
    // remove blankspaces at the start or end
    let username = data.username.trim();

    // lower case it
    username = username.toLowerCase();

    // search for username matches
    const usernameExists = await this.prisma.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });

    // throw conflict (409) if the username already exists
    if (usernameExists) {
      throw new ConflictException('Username already registered');
    }

    // remove blankspaces at the start or end
    const email = data.email.trim();

    // lower case it
    email.toLowerCase();

    // search for email matches
    const emailExists = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    // throw conflict (409) if the email already exists
    if (emailExists) {
      throw new ConflictException('Email already registered');
    }

    // hash the password
    let password = this.crypto.hashMD5(data.password).toUpperCase();
    password = this.crypto.getLoginHash(password, process.env.STATIC_KEY);
    password = await this.crypto.hashBcrypt(password);

    // check if user require activation
    const shouldActivate = this.email.isAvailable;

    // create the user
    const createdUser = await this.prisma.user.create({
      data: {
        email: email,
        username: username,
        nickname: username,
        password: password,
        active: !shouldActivate,
      },
    });

    // user should activate
    if (shouldActivate) {
      // generate the activation key
      const activationKey = this.crypto.generateRandomKey(45);
      // send the activation email
      await this.email.sendActivationEmail(email, username, activationKey); // add catch here on future
      // create the activation key
      await this.prisma.activation_key.create({
        data: {
          activation_key: activationKey,
          user_id: createdUser.id,
        },
      });
    }

    // return the created user id
    return createdUser.id;
  }
}
