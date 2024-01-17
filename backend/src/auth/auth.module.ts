import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { CryptoService } from '@common/services/crypto/crypto.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_TOKEN,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, CryptoService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
