import { Inject } from '@nestjs/common';

import { GalleryPermissionRepository } from '../infrastructure';
import {
  CheckAccessToGalleryParams,
  CheckAccessToGalleryResult,
} from './types';

import { IGalleryPermissionRepository } from './interfaces';

export class GalleryPermissionDomain {
  constructor(
    @Inject(GalleryPermissionRepository)
    private readonly galleryPermissionStore: IGalleryPermissionRepository,
  ) {}

  async checkAccessToGallery(
    params: CheckAccessToGalleryParams,
  ): Promise<CheckAccessToGalleryResult> {
    const { gallery, userId } = params;

    const galleryPermission =
      await this.galleryPermissionStore.getByUserIdAndGalleryId(
        userId,
        gallery.id,
      );

    if (galleryPermission) {
      return galleryPermission.access;
    }

    return gallery.access;
  }
}
