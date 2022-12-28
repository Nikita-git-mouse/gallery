import { Module } from '@nestjs/common';
import { GalleryModule } from '../gallery';
import {
  GalleryPermissionService,
  ObjectPermissionService,
} from './application';
import { GalleryPermissionDomain, ObjectPermissionDomain } from './domain';
import {
  GalleryPermissionRepository,
  ObjectPermissionRepository,
} from './infrastructure';
import {
  GalleryPermissionController,
  ObjectPermissionController,
} from './presentation';

@Module({
  controllers: [GalleryPermissionController, ObjectPermissionController],
  imports: [GalleryModule],
  providers: [
    GalleryPermissionService,
    ObjectPermissionService,
    GalleryPermissionRepository,
    ObjectPermissionRepository,
    ObjectPermissionDomain,
    GalleryPermissionDomain,
  ],
  exports: [GalleryPermissionService, ObjectPermissionService],
})
export class PermissionModule {}
