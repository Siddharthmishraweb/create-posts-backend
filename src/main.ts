/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not specified in env

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
