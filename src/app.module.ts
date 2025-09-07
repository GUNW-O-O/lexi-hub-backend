import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteModule } from './note/note.module';


@Module({
  imports: [
    ConfigModule.forRoot(), // 환경 변수 사용을 위한 모듈
    MongooseModule.forRoot('mongodb://localhost:27017/lexi-hub'), // MongoDB 연결
    AuthModule, NoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
