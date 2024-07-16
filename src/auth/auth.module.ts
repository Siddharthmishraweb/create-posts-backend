/* eslint-disable */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';
// import { GoogleStrategy } from './google.strategy';
// import { FacebookStrategy } from './facebook.strategy';
import { UsersModule } from '../users/users.module';
import { config } from 'dotenv';

config(); // Load environment variables from .env file if present

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
