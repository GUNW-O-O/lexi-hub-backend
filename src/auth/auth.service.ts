// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async signUp(id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // 10은 해시 강도
    
    // TODO: hashedPassword와 id를 DB에 저장하는 로직을 구현합니다.
    // 이 단계에서는 간단히 콘솔에 출력해볼 수 있습니다.
    console.log(`사용자 ID: ${id}, 해시된 비밀번호: ${hashedPassword}`);

    return { message: '회원가입 성공' };
  }

  async login(data: { id: string, password: string }) {
    // TODO: 데이터베이스에서 id를 이용해 사용자를 찾습니다.
    const preHashedPassword = await bcrypt.hash('123123', 10);
    const user = { id: 'test', hashedPassword: preHashedPassword }; // 임시 사용자 데이터
    
    // 1. 사용자가 존재하지 않는 경우
    if (data.id !== user.id) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }
    
    // 2. 비밀번호 일치 여부 확인
    const isMatch = await bcrypt.compare(data.password, user.hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    
    // TODO: 비밀번호가 일치하면 JWT를 발급하는 로직을 추가합니다.
    return { message: '로그인 성공' };
  }
}