import { Module } from '@nestjs/common';
import { ObjectController } from './presentation';
import { ObjectService } from './application';
import { FileStorageService, ObjectRepository } from './infrasturcture';
import { GalleryModule } from '../gallery';
import { PermissionModule } from '../permissions';

@Module({
  controllers: [ObjectController],
  providers: [ObjectService, ObjectRepository, FileStorageService],
  imports: [GalleryModule, PermissionModule],
  exports: [ObjectService],
})
export class ObjectModule {}
