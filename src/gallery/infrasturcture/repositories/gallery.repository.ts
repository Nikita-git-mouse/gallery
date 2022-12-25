import { EntityManager, Repository } from 'typeorm';
import { GalleryEntity } from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryRepository extends Repository<GalleryEntity> {
  constructor(@InjectEntityManager() entityManager: EntityManager) {
    super(GalleryEntity, entityManager);
  }
}
