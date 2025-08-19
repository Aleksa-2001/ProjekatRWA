import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { env } from 'process';

async function bootstrap() {
  env.TZ = 'Etc/UTC'
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  })
  app.use(cookieParser())
  await app.listen(3000)
}
bootstrap();
