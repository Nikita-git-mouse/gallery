import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { ConfigInterface, loaders } from '../config';
import { JwtMiddleware } from './auth/infrasturcture';

// import { PermissionsModule } from './permissions';
import { UsersModule } from './users';
import { AuthModule } from './auth';
import { GalleryModule } from './gallery';

import { UserEntity } from './users/infrasturcture/entities';
import { AuthEntity } from './auth/infrasturcture/entities';
import { GalleryEntity } from './gallery/infrasturcture/entities';

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
          entities: [UserEntity, AuthEntity, GalleryEntity],
          username,
          password,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    // PermissionsModule,
    AuthModule,
    GalleryModule,
    JwtModule,
  ],
  providers: [JwtMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
