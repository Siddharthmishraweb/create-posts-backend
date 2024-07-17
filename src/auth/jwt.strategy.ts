// // /* eslint-disable */
// // import { Injectable } from '@nestjs/common';
// // import { PassportStrategy } from '@nestjs/passport';
// // import { ExtractJwt, Strategy } from 'passport-jwt';
// // import { config } from 'dotenv';

// // config(); // Load environment variables from .env file if present


// // @Injectable()
// // export class JwtStrategy extends PassportStrategy(Strategy) {
// //   constructor() {
// //     super({
// //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// //       ignoreExpiration: false,
// //       secretOrKey: process.env.JWT_SECRET
// //     });
// //   }

// //   async validate(payload: any) {
// //     return { userId: payload.sub, username: payload.username };
// //   }
// // }
// /* eslint-disable */




// // import { Injectable } from '@nestjs/common';
// // import { PassportStrategy } from '@nestjs/passport';
// // import { ExtractJwt, Strategy } from 'passport-jwt';
// // import { JwtService } from '@nestjs/jwt';
// // import { config } from 'dotenv';

// // config(); // Load environment variables from .env file if present

// // @Injectable()
// // export class JwtStrategy extends PassportStrategy(Strategy) {
// //   constructor(private readonly jwtService: JwtService) {
// //     super({
// //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// //       ignoreExpiration: false,
// //       secretOrKey: process.env.JWT_SECRET,
// //     });
// //   }

// //   async validate(payload: any) {
// //     return { userId: payload.sub, username: payload.username };
// //   }
// // }

// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from './auth.service';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly configService: ConfigService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get<string>(process.env.JWT_SECRET),
//     });
//   }

// //   async validate(payload: any) {
// //     const user = await this.authService.validateUser(payload);
// //     if (!user) {
// //       throw new UnauthorizedException();
// //     }
// //     return user;
// //   }
// }


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "ghjhgdvbcsbdcghjdfn",
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserByJwt(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
