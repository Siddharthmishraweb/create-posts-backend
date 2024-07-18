
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) {
    
    console.log('JwtAuthGuard initialized');
    console.log('JwtService:', jwtService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('jwtService in canActivate:', this.jwtService);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
    } catch (e) {
      throw new UnauthorizedException('Token is invalid');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
