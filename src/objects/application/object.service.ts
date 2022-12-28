import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GalleryService } from '../../gallery';
import {
  GalleryPermissionService,
  ObjectPermissionService,
} from '../../permissions';
import { FileStorageService } from '../infrasturcture';
import { ObjectRepository } from '../infrasturcture/repositories';

import {
  AddObjectParams,
  AddObjectResult,
  ChangeAccessPolicyParams,
  ChangeAccessPolicyResult,
  DeleteObjectParams,
  DeleteObjectResult,
  GetAllAccessedObjectsByUserIdParams,
  GetAllAccessedObjectsByUserIdResult,
  GetAllObjectsParams,
  GetAllObjectsResult,
  GetByUserIdAndObjectIdParams,
  GetByUserIdAndObjectIdResult,
  GetObjectParams,
  GetObjectResult,
  GetObjectSourceParams,
  GetObjectSourceResult,
  GetUserObjectSourceParams,
  GetUserObjectSourceResult,
  UpdateObjectParams,
  UpdateObjectResult,
} from './object-service.types';

@Injectable()
export class ObjectService {
  constructor(
    private readonly objectsRepository: ObjectRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly galleryService: GalleryService,
    private readonly galleryPermissionService: GalleryPermissionService,
    private readonly objectsPermissionService: ObjectPermissionService,
    private readonly eventEmmiter: EventEmitter2,
  ) {}

  async addObject(params: AddObjectParams): Promise<AddObjectResult> {
    const { file, userId, access, fileName } = params;

    const { extension, filename } =
      await this.fileStorageService.saveFileViaBuffer(file);

    const newObject = await this.objectsRepository.save({
      access,
      name: fileName,
      pathToFile: filename,
      type: extension,
    });

    this.eventEmmiter.emit('object.created', {
      data: newObject,
      userId,
    });

    return { data: newObject };
  }

  async getObjectSource(
    params: GetObjectSourceParams,
  ): Promise<GetObjectSourceResult> {
    const { objectId, userId } = params;

    const object = await this.getObject({ objectId, userId });

    const stream = await this.fileStorageService.createReadStreamFile(
      object.data.pathToFile,
    );

    return { data: stream };
  }

  async getUserObjectSource(
    params: GetUserObjectSourceParams,
  ): Promise<GetUserObjectSourceResult> {
    const { objectId, userId, fromUserId } = params;

    const object = await this.getByUserIdAndObjectId({
      fromUserId,
      objectId,
      userId,
    });

    const stream = await this.fileStorageService.createReadStreamFile(
      object.data.pathToFile,
    );

    return { data: stream };
  }

  async getObject(params: GetObjectParams): Promise<GetObjectResult> {
    const { userId, objectId } = params;

    const gallery = await this.galleryService.getByUserId({ userId });

    if (!gallery.data) {
      throw new BadRequestException(`user with id <${userId}> not found`);
    }

    const object = await this.objectsRepository.findOne({
      where: {
        id: objectId,
        gallery: {
          id: gallery.data.id,
        },
      },
    });

    if (!object) {
      throw new BadRequestException(`object with id <${objectId}> not found`);
    }

    return {
      data: object,
    };
  }

  async updateObject(params: UpdateObjectParams): Promise<UpdateObjectResult> {
    const { userId, objectId, data } = params;

    const object = await this.getObject({ objectId, userId });

    const { raw } = await this.objectsRepository.update(
      { id: object.data.id },
      { ...data },
    );

    return {
      data: raw,
    };
  }

  async changeAccessPolicy(
    params: ChangeAccessPolicyParams,
  ): Promise<ChangeAccessPolicyResult> {
    const { userId, objectId } = params;

    const object = await this.getObject({ objectId, userId });

    await this.objectsRepository.update(
      { id: object.data.id },
      { access: !object.data.access },
    );

    return;
  }

  async deleteObject(params: DeleteObjectParams): Promise<DeleteObjectResult> {
    const { userId, objectId } = params;

    const object = await this.getObject({ objectId, userId });

    await this.objectsRepository.delete({ id: object.data.id });

    await this.fileStorageService.deleteFile(object.data.pathToFile);

    return;
  }

  async getAllUserObjects(
    params: GetAllObjectsParams,
  ): Promise<GetAllObjectsResult> {
    const { userId } = params;

    const gallery = await this.galleryService.getByUserId({ userId });

    if (!gallery.data) {
      throw new BadRequestException(`user with id <${userId}> not found`);
    }

    const objects = await this.objectsRepository.find({
      where: {
        gallery: {
          id: gallery.data.id,
        },
      },
    });

    return {
      data: objects,
    };
  }

  async getAllAccessedObjectsByUserId(
    params: GetAllAccessedObjectsByUserIdParams,
  ): Promise<GetAllAccessedObjectsByUserIdResult> {
    const { userId, fromUserId } = params;

    const gallery = await this.galleryService.getByUserId({
      userId: userId,
    });

    if (!gallery.data) {
      throw new BadRequestException(`user with id <${userId}> not found`);
    }

    if (fromUserId !== userId) {
      const isGalleryAccessed =
        await this.galleryPermissionService.checkUserPermissionToGallery({
          gallery: gallery.data,
          userId,
        });

      if (!isGalleryAccessed) {
        throw new ForbiddenException('access to gallery denied');
      }
    }

    const objects = await this.objectsRepository.find({
      where: {
        gallery: {
          id: gallery.data.id,
        },
      },
    });

    if (userId === fromUserId) {
      return {
        data: objects,
      };
    }

    const { objects: accessedObjects } =
      await this.objectsPermissionService.getAccessedObjectsToUser({
        objects,
        userId: fromUserId,
      });

    return {
      data: accessedObjects,
    };
  }

  async getByUserIdAndObjectId(
    params: GetByUserIdAndObjectIdParams,
  ): Promise<GetByUserIdAndObjectIdResult> {
    const { userId, fromUserId, objectId } = params;

    const gallery = await this.galleryService.getByUserId({
      userId,
    });

    if (!gallery.data) {
      throw new BadRequestException(`user with id <${userId}> not found`);
    }

    if (fromUserId !== userId) {
      const isGalleryAccessed =
        await this.galleryPermissionService.checkUserPermissionToGallery({
          gallery: gallery.data,
          userId,
        });

      if (!isGalleryAccessed) {
        throw new ForbiddenException('access to gallery denied');
      }
    }

    const object = await this.objectsRepository.findOne({
      where: {
        id: objectId,
        gallery: {
          id: gallery.data.id,
        },
      },
    });

    if (!object) {
      throw new BadRequestException(`object with id <${objectId}> not found`);
    }

    if (fromUserId === userId) {
      return {
        data: object,
      };
    }

    const isAccessed = await this.objectsPermissionService.checkAccessToUser({
      object,
      userId: fromUserId,
    });

    if (isAccessed) {
      return {
        data: object,
      };
    }

    throw new ForbiddenException('access to this object denied');
  }
}
