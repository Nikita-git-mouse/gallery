import { BadRequestException, Injectable } from '@nestjs/common';
import { GalleryService } from '../../gallery';
import { GalleryPermissionDomain } from '../domain';

import { GalleryPermissionRepository } from '../infrastructure';
import {
  CheckUserPermissionToGalleryParams,
  CheckUserPermissionToGalleryResult,
  DeletePermissionParams,
  DeletePermissionResult,
  GetAllByUserIdParams,
  GetAllByUserIdResult,
  UpdatePermissionParams,
  UpdatePermissionResult,
} from './types';

@Injectable()
export class GalleryPermissionService {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly galleryPermissionRepository: GalleryPermissionRepository,
    private readonly galleryPermissionDomain: GalleryPermissionDomain,
  ) {}

  async getAllByUserId(
    params: GetAllByUserIdParams,
  ): Promise<GetAllByUserIdResult> {
    const { userId } = params;

    const gallery = await this.galleryService.getByUserId({ userId });

    const permissions = await this.galleryPermissionRepository.find({
      where: {
        gallery: {
          id: gallery.data.id,
        },
      },
    });

    return {
      data: permissions,
    };
  }

  async deletePermission(
    params: DeletePermissionParams,
  ): Promise<DeletePermissionResult> {
    const { userId, specificUserId } = params;

    const gallery = await this.galleryService.getByUserId({ userId });

    const permission = await this.galleryPermissionRepository.findOne({
      where: {
        gallery: {
          id: gallery.data.id,
        },
        specificUser: {
          id: specificUserId,
        },
      },
    });

    if (!permission) {
      throw new BadRequestException(`object or user with their id not found`);
    }

    await this.galleryPermissionRepository.delete({ id: permission.id });

    return;
  }

  async updatePermission(
    params: UpdatePermissionParams,
  ): Promise<UpdatePermissionResult> {
    const { userId, specificUserId, access } = params;

    const gallery = await this.galleryService.getByUserId({ userId });

    const permission = await this.galleryPermissionRepository.findOne({
      where: {
        gallery: {
          id: gallery.data.id,
        },
        specificUser: {
          id: specificUserId,
        },
      },
    });

    let raw: any;
    if (permission) {
      const data = await this.galleryPermissionRepository.update(
        { id: permission.id },
        {
          access: access,
        },
      );

      raw = data.raw;
    } else {
      const newPermission = await this.galleryPermissionRepository.save({
        id: permission.id,
        access,
        gallery: gallery.data,
        specificUser: {
          id: specificUserId,
        },
      });

      raw = newPermission;
    }

    return { data: raw };
  }

  async checkUserPermissionToGallery(
    params: CheckUserPermissionToGalleryParams,
  ): Promise<CheckUserPermissionToGalleryResult> {
    const { userId, gallery } = params;

    return this.galleryPermissionDomain.checkAccessToGallery({
      gallery,
      userId,
    });
  }
}
