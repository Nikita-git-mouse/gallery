import { BadRequestException, Injectable } from '@nestjs/common';
import { GalleryRepository } from '../infrasturcture/repositories';

import {
  AssociateObjectWithGalleryParams,
  AssociateObjectWithGalleryResult,
  ChangeGalleryAccessParams,
  ChangeGalleryAccessResult,
  CreateGalleryParams,
  CreateGalleryResult,
  GetGalleryByUserIdParams,
  GetGalleryByUserIdResult,
} from './gallery-service.types';

@Injectable()
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

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

  async associateObjectWithGallery(
    params: AssociateObjectWithGalleryParams,
  ): Promise<AssociateObjectWithGalleryResult> {
    const { object, userId } = params;

    const gallery = await this.getByUserId({ userId });

    gallery.data.objects = gallery.data.objects
      ? [...gallery.data.objects, object]
      : [object];

    await this.galleryRepository.save(gallery.data);

    return;
  }

  async changeAccessPolicy(
    params: ChangeGalleryAccessParams,
  ): Promise<ChangeGalleryAccessResult> {
    const { userId } = params;

    const { data } = await this.getByUserId({ userId });

    if (data) {
      await this.galleryRepository.update(
        { id: data.id },
        { access: !data.access },
      );
    } else {
      throw new BadRequestException('gallery not found');
    }

    return undefined;
  }

  async getGalleryInfo(
    params: GetGalleryByUserIdParams,
  ): Promise<GetGalleryByUserIdResult> {
    const { userId } = params;

    const userGallery = await this.galleryRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return { data: userGallery };
  }

  async getByUserId(
    params: GetGalleryByUserIdParams,
  ): Promise<GetGalleryByUserIdResult> {
    const { userId } = params;

    const userGallery = await this.galleryRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        objects: true,
        user: true,
      },
    });

    return { data: userGallery };
  }
}
