/* eslint-disable */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: "ghjhgdvbcsbdcghjdfn" || process.env.JWT_SECRET, // Replace with your actual secret key or use process.env.JWT_SECRET
      signOptions: { expiresIn: '60m' }, // Adjust as needed
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    PostsModule,
    UsersModule,
  ],
})
export class AppModule {}
