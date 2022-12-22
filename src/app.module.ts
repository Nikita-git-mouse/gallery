import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './users';
import { ConfigInterface, loaders } from '../config';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth';
import { UserEntity } from './users/infrasturcture/entities';
import { AuthEntity } from './auth/infrasturcture/entities';
import { JwtMiddleware } from './auth/infrasturcture';
import { RefreshJwtMiddleware } from './auth/infrasturcture/middlewares/refresh-jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: loaders,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService<ConfigInterface>) => {
        const { host, password, port, username } = config.get('postgres');

        return {
          synchronize: true,
          port,
          host,
          type: 'postgres',
          migrations: [],
          entities: [UserEntity, AuthEntity],
          username,
          password,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    PermissionsModule,
    AuthModule,
    JwtModule,
  ],
  providers: [JwtMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, RefreshJwtMiddleware).forRoutes('*');
  }
}
