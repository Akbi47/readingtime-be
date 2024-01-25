import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { BodyValidationPipe } from './shares/pipes/body.validation.pipe';
import { ResponseTransformInterceptor } from './shares/pipes/interceptors/response.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const allowedOrigins = [
    'https://www.readingtime.vn',
    'http://localhost:3000',
    'http://localhost:3002',
    'https://reading-time-six.vercel.app',
  ];
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', ' PATCH', 'DELETE'],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new BodyValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3600);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
