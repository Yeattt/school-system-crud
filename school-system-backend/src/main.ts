import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  //* ---- INSTANCIA DE LOGGER PARA PODER VER MEJOR LOS DATOS IMPRESOS EN CONSOLA ---- *//
  const logger: Logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  //* ---- CONFIGURACIÓN DE LOS PIPES DE VALIDACIÓN ---- *//
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //* ---- HABILITAR LOS CORS ---- *//
  app.enableCors();
  
  app.setGlobalPrefix('api');

  await app.listen(envs.port);

  logger.log(`Server running on port ${envs.port}`);
}
bootstrap();
