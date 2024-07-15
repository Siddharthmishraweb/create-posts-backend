/* eslint-disable */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google-login')
  async googleLogin(@Body() body: any) {
    const user = await this.authService.validateUserByGoogle(body);
    const token = await this.authService.login(user);
    return { token: token, user: user }
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req, @Res() res) {
    const jwt = await this.authService.login(req.user);
    res.redirect(`http://localhost:4200/login/success?jwt=${jwt.access_token}`);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    // initiates the Facebook OAuth2 login flow
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res) {
    const jwt = await this.authService.login(req.user);
    res.redirect(`http://localhost:4200/login/success?jwt=${jwt.access_token}`);
  }
}

