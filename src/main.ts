import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as https from 'https';
import * as http from 'http';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { ConfigInterface } from '../config';
import { AppModule } from './app.module';

async function bootstrap() {
  const requestListener = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(requestListener),
  );

  app.use(cookieParser());

  app.setGlobalPrefix('/api');

  // cors
  app.enableCors();

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipUndefinedProperties: false,
      skipMissingProperties: false,
    }),
  );

  // swagger
  const builder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Gallery')
    .setDescription('Some description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('/docs', app, document);

  await app.init();

  const configService = app.get<ConfigService<ConfigInterface>>(ConfigService);
  const { host, port, ssl, protocol } = configService.get('app');

  let server: http.Server;
  if (protocol === 'https') {
    server = https.createServer(
      { ...ssl, passphrase: 'my secret' },
      requestListener,
    );
  } else {
    server = http.createServer(requestListener);
  }

  server.listen(port, host, () => {
    console.log(`Server listens to ${protocol}://${host}:${port}`);
  });
}
bootstrap();
