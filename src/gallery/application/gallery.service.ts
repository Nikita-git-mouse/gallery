import { BadRequestException, Injectable } from '@nestjs/common';
import { FileStorageService } from '../../objects/infrasturcture';
import { GalleryRepository } from '../infrasturcture/repositories';

import {
  ChangeGalleryAccessParams,
  ChangeGalleryAccessResult,
  CreateGalleryParams,
  CreateGalleryResult,
} from './gallery-service.types';

@Injectable()
export class GalleryService {
  constructor(
    private readonly galleryRepository: GalleryRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async createGallery(
    params: CreateGalleryParams,
  ): Promise<CreateGalleryResult> {
    const newGallery = this.galleryRepository.create({
      ...params,
      objects: [],
    });

    const gallery = await this.galleryRepository.save(newGallery);

    return {
      data: gallery,
    };
  }

  async changeAccessPolicy(
    params: ChangeGalleryAccessParams,
  ): Promise<ChangeGalleryAccessResult> {
    const { userId } = params;

    const userGallery = await this.galleryRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (userGallery) {
      await this.galleryRepository.update(
        { id: userGallery.id },
        { access: !userGallery.access },
      );
    } else {
      throw new BadRequestException('gallery not found');
    }

    return undefined;
  }
}
