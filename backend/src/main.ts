import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // automatically transform incoming data to DTO objects
      whitelist: true, // remove properties that dont have decorators defined
      forbidNonWhitelisted: true, // throw an error if any not whitelisted properties are present
      validationError: { target: false }, // only expose validation errors for the DTO, not the entire object
    }),
  );

  // enable cors
  app.enableCors();

  // listen on PORT 5000
  await app.listen(5000);
}
bootstrap();
