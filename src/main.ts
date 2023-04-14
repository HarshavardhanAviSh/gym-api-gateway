import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule,{cors:true});
//   await app.listen(4444)
//   await app.enableCors();

// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  await app.listen(3001)
  await app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

}
bootstrap();
