import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt'; // JwtModule 임포트
import { PassportModule } from '@nestjs/passport'; // PassportModule 임포트

@Module({
  imports: [
    // Auth 모듈에 User 모델 등록
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({ // JwtModule 등록
      secret: '123123', // 민감한 정보이므로 환경 변수로 관리해야 함
      signOptions: { expiresIn: '5h' }, // 토큰 유효 기간
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
