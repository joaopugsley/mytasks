import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { CryptoService } from '@common/services/crypto/crypto.service';
import { EmailService } from '@common/services/email/email.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, CryptoService, EmailService, UserService],
})
export class UserModule {}
