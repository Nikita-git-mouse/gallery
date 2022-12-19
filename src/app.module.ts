import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users';

import { ConfigInterface, loaders } from '../config';
import { PermissionsModule } from './permissions/permissions.module';

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
          // synchronize: true,
          port,
          host,
          type: 'postgres',
          migrations: [],
          entities: ['**/entities/*.entity.js'],
          username,
          password,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    PermissionsModule,
  ],
})
export class AppModule {}
