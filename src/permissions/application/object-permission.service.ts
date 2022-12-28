import { BadRequestException, Injectable } from '@nestjs/common';

import {
  CheckAccessToUserParams,
  CheckAccessToUserResult,
  CheckUserPermissionToObjectsParams,
  CheckUserPermissionToObjectsResult,
  DeleteObjectPermissionParams,
  DeleteObjectPermissionResult,
  GetAllObjectPermissionsByUserIdParams,
  GetAllObjectPermissionsByUserIdResult,
  UpdateObjectPermissionParams,
  UpdateObjectPermissionResult,
} from './types';
import { ObjectPermissionRepository } from '../infrastructure';
import { ObjectPermissionDomain } from '../domain';
import { GalleryService } from '../../gallery';

@Injectable()
export class ObjectPermissionService {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly objectPermissionRepository: ObjectPermissionRepository,
    private readonly objectPermissionDomain: ObjectPermissionDomain,
  ) {}

  async getAllByUserId(
    params: GetAllObjectPermissionsByUserIdParams,
  ): Promise<GetAllObjectPermissionsByUserIdResult> {
    const { userId } = params;

    const gallery = await this.galleryService.getByUserId({ userId });

    const permissions = await this.objectPermissionRepository.find({
      where: {
        object: {
          gallery: {
            id: gallery.data.id,
          },
        },
      },
    });

    return {
      data: permissions,
    };
  }

  async deletePermission(
    params: DeleteObjectPermissionParams,
  ): Promise<DeleteObjectPermissionResult> {
    const { userId, specificUserId, objectId } = params;

    const gallery = await this.galleryService.getByUserId({ userId });

    const permission = await this.objectPermissionRepository.findOne({
      where: {
        object: {
          id: objectId,
          gallery: {
            id: gallery.data.id,
          },
        },
        specificUser: {
          id: specificUserId,
        },
      },
    });

    if (!permission) {
      throw new BadRequestException(`object or user with their id not found`);
    }

    await this.objectPermissionRepository.delete({ id: permission.id });

    return;
  }

  async updatePermission(
    params: UpdateObjectPermissionParams,
  ): Promise<UpdateObjectPermissionResult> {
    const { userId, specificUserId, objectId, access } = params;

    const gallery = await this.galleryService.getByUserId({ userId });

    const permission = await this.objectPermissionRepository.findOne({
      where: {
        object: {
          gallery: {
            id: gallery.data.id,
          },
          id: objectId,
        },
        specificUser: {
          id: specificUserId,
        },
      },
    });

    let raw: any;
    if (permission) {
      const data = await this.objectPermissionRepository.update(
        { id: permission.id },
        {
          access,
        },
      );

      raw = data.raw;
    } else {
      const newPermission = await this.objectPermissionRepository.save({
        id: permission.id,
        access,
        object: {
          id: objectId,
        },
        specificUser: {
          id: specificUserId,
        },
      });

      raw = newPermission;
    }

    return { data: raw };
  }

  async getAccessedObjectsToUser(
    params: CheckUserPermissionToObjectsParams,
  ): Promise<CheckUserPermissionToObjectsResult> {
    const { userId, objects } = params;

    return this.objectPermissionDomain.getAccessedObjectsToUser({
      objects,
      userId,
    });
  }

  async checkAccessToUser(
    params: CheckAccessToUserParams,
  ): Promise<CheckAccessToUserResult> {
    const { userId, object } = params;

    return this.objectPermissionDomain.checkAccessToUser({ object, userId });
  }
}
