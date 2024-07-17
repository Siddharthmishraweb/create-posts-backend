// // // /* eslint-disable */

// // // import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// // // import { AuthGuard } from '@nestjs/passport';
// // // import { JwtService } from '@nestjs/jwt';

// // // @Injectable()
// // // export class JwtAuthGuard extends AuthGuard('jwt') {
// // //   constructor(private readonly jwtService: JwtService) {
// // //     super();
// // //   }

// // //   canActivate(context: ExecutionContext) {
// // //     const request = context.switchToHttp().getRequest();
// // //     const token = request.headers.authorization?.split(' ')[1];
// // //     if (!token) {
// // //       throw new UnauthorizedException('No token provided');
// // //     }
// // //     console.log("token:: ", token);
// // //     try {
// // //       const decoded = this.jwtService.verify(token);
// // //       request.user = decoded;
// // //     } catch (err) {
// // //       throw new UnauthorizedException('Invalid token');
// // //     }
// // //     return super.canActivate(context);
// // //   }
// // // }

// // import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// // import { AuthGuard } from '@nestjs/passport';
// // import { JwtService } from '@nestjs/jwt';

// // @Injectable()
// // export class JwtAuthGuard extends AuthGuard('jwt') {
// //   constructor(private readonly jwtService: JwtService) {
// //     console.log("jwtService:::  ", jwtService);
// //     super();
// //   }

// //   canActivate(context: ExecutionContext) {
// //     const request = context.switchToHttp().getRequest();
// //     const token = request.headers.authorization?.split(' ')[1];
// //     if (!token) {
// //       throw new UnauthorizedException('No token provided');
// //     }
// //     try {
// //       console.log("this.jwtService =>>  ", this.jwtService)
// //       const decoded = this.jwtService.verify(token);
// //       console.log("decoded:::   ", decoded)
// //       request.user = decoded;
// //     } catch (err) {
// //       console.log("error::: ", err);
// //       throw new UnauthorizedException('Invalid token');
// //     }
// //     return super.canActivate(context);
// //   }
// // }















// // import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// // import { AuthGuard } from '@nestjs/passport';
// // import { JwtService } from '@nestjs/jwt';

// // @Injectable()
// // export class JwtAuthGuard extends AuthGuard('jwt') {
// //   constructor(private readonly jwtService: JwtService) {
// //     super();
// //   }


// //   onModuleInit() {
// //     console.log('JwtAuthGuard module initialized');
// //     console.log('jwtService in onModuleInit::: ', this.jwtService);
// //   }

// //   canActivate(context: ExecutionContext) {
// //     const request = context.switchToHttp().getRequest();
// //     const token = request.headers.authorization?.split(' ')[1];
// //     if (!token) {
// //       throw new UnauthorizedException('No token provided');
// //     }
// //     try {
// //       console.log("this.jwtService =>>  ", this.jwtService);
// //       const decoded = this.jwtService.verify(token);
// //       console.log("decoded:::   ", decoded);
// //       request.user = decoded;
// //     } catch (err) {
// //       console.log("error::: ", err);
// //       throw new UnauthorizedException('Invalid token');
// //     }
// //     return super.canActivate(context);
// //   }
// // }












// // import { Injectable, ExecutionContext, UnauthorizedException, OnModuleInit } from '@nestjs/common';
// // import { AuthGuard } from '@nestjs/passport';
// // import { JwtService } from '@nestjs/jwt';

// // @Injectable()
// // export class JwtAuthGuard extends AuthGuard('jwt') implements OnModuleInit {
// //   constructor(private readonly jwtService: JwtService) {
// //     super();
// //   }

// //   onModuleInit() {
// //     console.log('JwtAuthGuard module initialized');
// //     console.log('jwtService in onModuleInit::: ', this.jwtService);
// //   }

// //   canActivate(context: ExecutionContext) {
// //     const request = context.switchToHttp().getRequest();
// //     const token = request.headers.authorization?.split(' ')[1];
// //     if (!token) {
// //       throw new UnauthorizedException('No token provided');
// //     }
// //     try {
// //       console.log("this.jwtService =>>  ", this.jwtService);
// //       const decoded = this.jwtService.verify(token);
// //       console.log("decoded:::   ", decoded);
// //       request.user = decoded;
// //     } catch (err) {
// //       console.log("error::: ", err);
// //       throw new UnauthorizedException('Invalid token');
// //     }
// //     return super.canActivate(context);
// //   }
// // }





























// import { Injectable, ExecutionContext, UnauthorizedException, OnModuleInit } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') implements OnModuleInit {
//   constructor(private readonly jwtService: JwtService) {
//     console.log("aaya::");
//     super();
//   }

//   onModuleInit() {
//     console.log('JwtAuthGuard module initialized');
//     console.log('jwtService in onModuleInit::: ', this.jwtService);
//   }

//   canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers.authorization?.split(' ')[1];
//     if (!token) {
//       throw new UnauthorizedException('No token provided');
//     }
//     try {
//       console.log(this.jwtService);
//       const decoded = this.jwtService.verify(token);
//       request.user = decoded;
//     } catch (err) {
//       console.log("err", err)
//       throw new UnauthorizedException('Invalid token');
//     }
//     return super.canActivate(context);
//   }
// }

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
