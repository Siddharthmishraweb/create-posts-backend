// /* eslint-disable */
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { PostsModule } from './posts/posts.module';
// import { UsersModule } from './users/users.module';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [
//     JwtModule.register({
//       secret: "ghjhgdvbcsbdcghjdfn" || process.env.JWT_SECRET, // Replace with your actual secret key or use process.env.JWT_SECRET
//       signOptions: { expiresIn: '60h' }, // Adjust as needed
//     }),
//     ConfigModule.forRoot({ isGlobal: true }),
//     MongooseModule.forRoot(process.env.MONGO_URI),
//     AuthModule,
//     PostsModule,
//     UsersModule,
//   ],
// })
// export class AppModule {}







// import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthModule } from './auth/auth.module';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { ConfigModule } from '@nestjs/config';
// import { UsersModule } from './users/users.module';
// import { PostsModule } from './posts/posts.module';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [
//     MongooseModule.forRoot(process.env.MONGO_URI),
//     ConfigModule.forRoot(), // Load .env variables
//     AuthModule,
//     UsersModule,
//     PostsModule,
//   ],
//   providers: [
//     {
//       provide: APP_GUARD,
//       useClass: JwtAuthGuard,
//     },
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    PostsModule
  ],
})
export class AppModule {}
