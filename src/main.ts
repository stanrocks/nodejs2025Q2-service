import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

import { AppModule } from './app.module';
import { LoggingService } from './logger/logger.service';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const logger = new LoggingService();
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('Home Library API')
    .setDescription('The Home Library API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(PORT);

  logger.always(
    `Server started on http://localhost:${PORT}`,
    'NestApplication',
  );
  logger.always(`Swagger: http://localhost:${PORT}/doc/`, 'NestApplication');
}

bootstrap();
