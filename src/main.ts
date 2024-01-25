import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { BodyValidationPipe } from './shares/pipes/body.validation.pipe';
import { ResponseTransformInterceptor } from './shares/pipes/interceptors/response.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', ' PATCH', 'DELETE'],
    // credentials: true,
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
