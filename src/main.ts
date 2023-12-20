// Third Party Dependencies
import { NestFactory } from '@nestjs/core';

// Local Dependencies
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  // Init NestJS app and set global prefix.
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = AppModule.port;
  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();
