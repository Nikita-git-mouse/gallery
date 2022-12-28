import { Inject } from '@nestjs/common';

import { ObjectPermissionRepository } from '../infrastructure';
import {
  CheckAccessToUserParams,
  CheckAccessToUserResult,
  GetAccessedObjectsToUserParams,
  GetAccessedObjectsToUserResult,
} from './types';

import { IObjectPermissionRepository } from './interfaces';

export class ObjectPermissionDomain {
  constructor(
    @Inject(ObjectPermissionRepository)
    private readonly objectPermissionStore: IObjectPermissionRepository,
  ) {}

  async getAccessedObjectsToUser(
    params: GetAccessedObjectsToUserParams,
  ): Promise<GetAccessedObjectsToUserResult> {
    const { objects, userId } = params;

    const objectsIds: Array<number> = objects.map((object) => object.id);

    const objectsPermissions =
      await this.objectPermissionStore.getByUserIdAndObjectsId(
        userId,
        objectsIds,
      );

    return {
      objects: objects.filter((object) => {
        const objectPermission = objectsPermissions.find(
          (obj) => obj.id === object.id,
        );

        if (objectPermission) {
          return objectPermission.access;
        }

        return object.access;
      }),
    };
  }

  async checkAccessToUser(
    params: CheckAccessToUserParams,
  ): Promise<CheckAccessToUserResult> {
    const { object, userId } = params;

    const objectPermission =
      await this.objectPermissionStore.getByUserIdAndObjectId(
        userId,
        object.id,
      );

    if (objectPermission) {
      return objectPermission.access;
    }

    return object.access;
  }
}
