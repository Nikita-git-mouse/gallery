import { Module } from '@nestjs/common';
import { UsersController } from './presentation';
import { UsersService } from './application';
import { UserRepository } from './infrasturcture';
import { GalleryModule } from '../gallery';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [GalleryModule],
  exports: [UsersService],
})
export class UsersModule {}
