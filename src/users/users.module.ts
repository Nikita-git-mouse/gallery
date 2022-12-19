import { Module } from '@nestjs/common';
import { UsersController } from './presentation';
import { UsersService } from './application';
import { UserRepository } from './infrasturcture';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [],
  exports: [UsersService],
})
export class UsersModule {}
