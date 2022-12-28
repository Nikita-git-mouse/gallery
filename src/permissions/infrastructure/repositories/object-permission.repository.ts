import { EntityManager, In, Repository } from 'typeorm';
import { ObjectPermissionEntity } from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IObjectPermission, IObjectPermissionRepository } from '../../domain';

@Injectable()
export class ObjectPermissionRepository
  extends Repository<ObjectPermissionEntity>
  implements IObjectPermissionRepository
{
  constructor(@InjectEntityManager() entityManager: EntityManager) {
    super(ObjectPermissionEntity, entityManager);
  }

  async getByUserIdAndObjectId(
    userId: number,
    objectId: number,
  ): Promise<IObjectPermission> {
    const object = await this.findOne({
      where: {
        specificUser: {
          id: userId,
        },
        object: {
          id: objectId,
        },
      },
    });

    return object;
  }

  async getByUserIdAndObjectsId(
    userId: number,
    objectsIds: number[],
  ): Promise<IObjectPermission[]> {
    const objects = await this.find({
      where: {
        id: In(objectsIds),
        specificUser: {
          id: userId,
        },
      },
    });

    return objects;
  }
}
