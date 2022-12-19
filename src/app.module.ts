import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      synchronize: true,
      port: 7432,
      host: '127.0.0.1',

      type: 'postgres',
      migrations: [],
      entities: ['**/entities/*.entity.js'],
      username: 'username',
      password: 'password',
    }),
    UsersModule,
  ],
})
export class AppModule {}
