import { BadRequestException, Injectable } from '@nestjs/common';
import { GalleryRepository } from '../infrasturcture/repositories';

import {
  ChangeGalleryAccessParams,
  ChangeGalleryAccessResult,
  CreateGalleryParams,
  CreateGalleryResult,
} from './gallery-service.types';

@Injectable()
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  async createGallery(
    params: CreateGalleryParams,
  ): Promise<CreateGalleryResult> {
    const newGallery = this.galleryRepository.create({
      ...params,
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
