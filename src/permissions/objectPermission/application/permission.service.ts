import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../infrasturcture/repositories';

@Injectable()
export class PermissionsService {
  constructor(private readonly PermissionsRepository: PermissionRepository) {}

  // findAll(): Promise<any[]> {
  //   return this.PermissionsRepository.find();
  // }

  // findOne(id): Promise<any> {
  //   return this.PermissionsRepository.findOneBy({ id });
  // }

  // async remove(id: number): Promise<void> {
  //   await this.PermissionsRepository.delete(id);
  // }
}
