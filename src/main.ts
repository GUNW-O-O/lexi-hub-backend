import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ValidationPipe 임포트

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 전역 파이프 추가
  // CORS 설정
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
