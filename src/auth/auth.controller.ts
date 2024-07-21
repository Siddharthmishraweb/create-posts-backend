import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getWelcome(@Res() res) {
    return res.send('Welcome to the Blogify auth API!');
  }

  @Post('google-fb-login')
  async googleLogin(@Body() body: any) {
    const user = await this.authService.validateUserByGoogle(body);
    const token = await this.authService.login(user);
    return { token: token, user: user }
  }

}

