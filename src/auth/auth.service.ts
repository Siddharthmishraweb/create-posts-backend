import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUserByGoogle(profile: any): Promise<any> {
    const user = await this.usersService.findOrCreateByGoogle(profile);
    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      name: user.name,
      profilePic: user.profilePic,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserByJwt(payload: any): Promise<any> {
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
