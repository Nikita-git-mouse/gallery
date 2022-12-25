import { Module } from '@nestjs/common';
import { GalleryController } from './presentation';
import { GalleryService } from './application';
import { GalleryRepository } from './infrasturcture';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService, GalleryRepository],
  imports: [],
})
export class UsersModule {}
