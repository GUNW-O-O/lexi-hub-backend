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
  async login(@Body() data: { id: string; password: string }, @Res({ passthrough: true }) res: any) {
    const { accessToken, refreshToken } = await this.authService.login(data);
    console.log(refreshToken);

    // 쿠키 설정 로직 추가
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === '123123',
      sameSite: 'lax',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken };
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
      sameSite: 'lax',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후 만료
    });

    return { accessToken };
  }
}
