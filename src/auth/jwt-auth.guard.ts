// /* eslint-disable */

// import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(private readonly jwtService: JwtService) {
//     super();
//   }

//   canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers.authorization?.split(' ')[1];
//     if (!token) {
//       throw new UnauthorizedException('No token provided');
//     }
//     console.log("token:: ", token);
//     try {
//       const decoded = this.jwtService.verify(token);
//       request.user = decoded;
//     } catch (err) {
//       throw new UnauthorizedException('Invalid token');
//     }
//     return super.canActivate(context);
//   }
// }

import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const decoded = this.jwtService.verify(token);
      console.log("decoded:::   ", decoded)
      request.user = decoded;
    } catch (err) {
      console.log("error::: ", err);
      throw new UnauthorizedException('Invalid token');
    }
    return super.canActivate(context);
  }
}
