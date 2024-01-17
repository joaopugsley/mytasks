import { CryptoModule } from '@common/services/crypto/crypto.module';
import { EmailModule } from '@common/services/email/email.module';
import { PrismaModule } from '@common/services/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@users/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),
    PrismaModule,
    CryptoModule,
    EmailModule,
    AuthModule,
    UserModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
