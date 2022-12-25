import { Injectable } from '@nestjs/common';
import { GalleryRepository } from '../infrasturcture/repositories';

import { CreateGalleryParams, CreateGalleryResult } from './gallery-service.types';


@Injectable()
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  async createGallery(params: CreateGalleryParams): Promise<CreateGalleryResult> {
    const newGallery = this.galleryRepository.create({
      ...params,
    });

    const gallery = await this.galleryRepository.save(newGallery);
    return {
      data: gallery,
    };
  }



//   findAll(): Promise<any[]> {
//     return this.usersRepository.find();
//   }

//   findOne(id): Promise<any> {
//     return this.usersRepository.findOneBy({ id });
//   }

//   async remove(id: number): Promise<void> {
//     await this.usersRepository.delete(id);
//   }
// }
