import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AuthController } from './presentation';
import { AuthService } from './application';
import {
  AuthRepository,
  EmailService,
  RefreshJwtMiddleware,
} from './infrasturcture';
import { UsersModule } from '../users';
import { resolve } from 'path';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, EmailService],
  imports: [
    UsersModule,
    JwtModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'igrakkaunt@gmail.com',
          pass: 'nbcroowkjsdyewxd',
        },
      },
      defaults: {
        from: '"Gallery Support',
      },
      template: {
        dir: resolve(process.cwd(), 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshJwtMiddleware).forRoutes('*');
  }
}
