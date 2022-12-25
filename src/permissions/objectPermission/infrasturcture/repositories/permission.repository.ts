import { EntityManager, Repository } from 'typeorm';
import { PermissionEntity } from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionRepository extends Repository<PermissionEntity> {
  constructor(@InjectEntityManager() entityManager: EntityManager) {
    super(PermissionEntity, entityManager);
  }
}
