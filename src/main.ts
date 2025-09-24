import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://lexihub.s3-website.ap-northeast-2.amazonaws.com'
    ],
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
