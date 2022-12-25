import { Module } from '@nestjs/common';
import { PermissionsController } from './presentation/permissions.controller';
import { PermissionsService } from './application';
import { PermissionRepository } from './infrasturcture';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionRepository],
  imports: [],
  exports: [PermissionsService],
})
export class PermissionsGalleryModule {}
