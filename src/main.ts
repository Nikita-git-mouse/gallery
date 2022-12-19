import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigInterface } from '../config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  SwaggerModule.setup('docs', app, document);

  const configService = app.get<ConfigService<ConfigInterface>>(ConfigService);
  const { host, port } = configService.get('app');

  await app.listen(port, host);

  console.log(`Server listens to ${await app.getUrl()}`);
}
bootstrap();
