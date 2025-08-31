import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('join')
  async signup(@Body() data: {id: string, password: string}) {
    return this.authService.signUp(data.id, data.password);
  }
  
  @Post('login')
  async login(@Body() data: { id: string; password: string }) {
    const result = await this.authService.login(data.id, data.password);
    return result;
  }
}
