// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; // Import `InjectModel`
import { JwtService } from '@nestjs/jwt'; // JwtService 임포트
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { Payload } from './auth.interface';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService) { }

  async signUp(id: string, password: string, nickname: string) {
    // 1. 이미 존재하는 사용자인지 확인
    const existingUser = await this.userModel.findOne({ $or: [{ id }, { nickname }] }).exec();
    if (existingUser) {
      if (existingUser.id === id) {
        throw new ConflictException('이미 존재하는 아이디입니다.');
      } else {
        throw new ConflictException('이미 존재하는 닉네임입니다.');
      }
    }

    // 2. 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 새로운 사용자 생성 및 저장
    const newUser = new this.userModel({ id, password: hashedPassword, nickname });
    await newUser.save();

    return { message: '회원가입 성공' };
  }

  async login(data: { id: string, password: string }) {
    // 1. 데이터베이스에서 id를 이용해 사용자를 찾습니다.
    const user = await this.userModel.findOne({ id: data.id }).exec();
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    // 2. 입력된 비밀번호와 DB에 저장된 해시된 비밀번호를 비교합니다.
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    // JWT 페이로드 생성
    if(user && user._id) {
      const payload = { id: user._id.toString(), nickname: user.nickname };
      return {
        access_token: this.jwtService.sign(payload),
        message: '로그인 성공'
      };
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }
  async validateUser(payload: Payload): Promise<User | null> {
    // MongoDB에서 payload.id를 사용해 사용자 찾기
    const user = await this.userModel.findById(payload.id).exec();
    if (!user) {
      return null;
    }
    return user;
  }
}