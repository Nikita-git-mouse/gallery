import { EntityManager, Repository } from 'typeorm';
import { GalleryPermissionEntity } from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IGalleryPermissionRepository } from '../../domain/interfaces';
import { IGalleryPermission } from '../../domain';

@Injectable()
export class GalleryPermissionRepository
  extends Repository<GalleryPermissionEntity>
  implements IGalleryPermissionRepository
{
  constructor(@InjectEntityManager() entityManager: EntityManager) {
    super(GalleryPermissionEntity, entityManager);
  }
  async getByUserIdAndGalleryId(
    userId: number,
    galleryId: number,
  ): Promise<IGalleryPermission | null> {
    const galleryPermission = await this.findOne({
      where: {
        gallery: {
          id: galleryId,
        },
        specificUser: {
          id: userId,
        },
      },
    });

    return galleryPermission;
  }
}
