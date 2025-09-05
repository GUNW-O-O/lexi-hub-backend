import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('join')
  async signup(@Body() data: { id: string, password: string, nickname: string }) {
    return this.authService.signUp(data.id, data.password, data.nickname);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: { id: string; password: string }) {
    const result = await this.authService.login(data);
    return result;
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: any, @Res({ passthrough: true }) res: any) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('리프레시 토큰이 누락되었습니다.');
    }

    const { accessToken, newRefreshToken } = await this.authService.refreshToken(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === '123123',
      sameSite: 'strict',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후 만료
    });

    return { accessToken };
  }
}
