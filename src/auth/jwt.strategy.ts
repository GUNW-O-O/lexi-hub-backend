// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Payload } from './auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123123', // 환경 변수로 관리해야 합니다.
    });
  }

  async validate(payload: Payload) {
    console.log('디코딩된 페이로드:', payload);

    // 페이로드의 ID를 사용하여 사용자 찾기
    const user = await this.authService.validateUser(payload);

    console.log('검증 결과:', user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}