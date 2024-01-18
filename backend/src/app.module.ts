import { CryptoModule } from '@common/services/crypto/crypto.module';
import { EmailModule } from '@common/services/email/email.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@users/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './tasks/task.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
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
