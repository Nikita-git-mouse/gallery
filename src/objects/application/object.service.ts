import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GalleryService } from '../../gallery';
import { FileStorageService } from '../infrasturcture';
import { ObjectRepository } from '../infrasturcture/repositories';

import {
  AddObjectParams,
  AddObjectResult,
  GetAllObjectsParams,
  GetAllObjectsResult,
} from './object-service.types';

@Injectable()
export class ObjectService {
  constructor(
    private readonly objectsRepository: ObjectRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly galleryService: GalleryService,
    private readonly eventEmmiter: EventEmitter2,
  ) {}

  async addObject(params: AddObjectParams): Promise<AddObjectResult> {
    const { file, userId, access, accessed, banned, fileName } = params;

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
      accessed,
      banned,
    });

    return { data: newObject };
  }

  async getAllUserObjects(
    params: GetAllObjectsParams,
  ): Promise<GetAllObjectsResult> {
    const { userId } = params;

    const gallery = await this.galleryService.getByUserId({ userId });

    if (gallery.data) {
      const { data } = gallery;

      const objects = await this.objectsRepository.find({
        where: {
          gallery: {
            id: data?.id || -1,
          },
        },
      });

      return {
        data: objects || [],
      };
    }

    return {
      data: [],
    };
  }
}
