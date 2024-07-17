// // /* eslint-disable */
// // import { Module } from '@nestjs/common';
// // import { PassportModule } from '@nestjs/passport';
// // import { JwtModule } from '@nestjs/jwt';
// // import { AuthService } from './auth.service';
// // import { AuthController } from './auth.controller';
// // // import { JwtStrategy } from './jwt.strategy';
// // // import { GoogleStrategy } from './google.strategy';
// // // import { FacebookStrategy } from './facebook.strategy';
// // import { UsersModule } from '../users/users.module';
// // import { config } from 'dotenv';
// // import { JwtAuthGuard } from './jwt-auth.guard';

// // config(); // Load environment variables from .env file if present

// // @Module({
// //   imports: [
// //     PassportModule,
// //     JwtModule.register({
// //       secret: process.env.JWT_SECRET,
// //       signOptions: { expiresIn: '60h' },
// //     }),
// //     UsersModule,
// //   ],
// //   providers: [AuthService, JwtAuthGuard],
// //   controllers: [AuthController],
// //   exports: [JwtAuthGuard],
// // })
// // export class AuthModule {}
















// /* eslint-disable */
// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// // import { JwtStrategy } from './jwt.strategy';
// // import { GoogleStrategy } from './google.strategy';
// // import { FacebookStrategy } from './facebook.strategy';
// import { UsersModule } from '../users/users.module';
// import { config } from 'dotenv';
// import { JwtAuthGuard } from './jwt-auth.guard';

// config(); // Load environment variables from .env file if present

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: { expiresIn: '60h' },
//     }),
//     UsersModule,
//   ],
//   providers: [AuthService, JwtAuthGuard],
//   controllers: [AuthController],
//   exports: [JwtAuthGuard],
// })
// export class AuthModule {}


// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.module';
// import { JwtStrategy } from './jwt.strategy';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>(process.env.JWT_SECRET),
//         signOptions: { expiresIn: '60m' },
//       }),
//     }),
//     UsersModule,
//   ],
//   providers: [AuthService, JwtStrategy],
//   controllers: [AuthController],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: "ghjhgdvbcsbdcghjdfn",
        signOptions: { expiresIn: '60h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
