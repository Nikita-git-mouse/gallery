import { Injectable } from '@nestjs/common';
import { ObjectRepository } from '../infrasturcture/repositories';

import { CreateObjectParams, CreateObjectResult } from './object-service.types';

@Injectable()   
export class ObjectService {
  constructor(private readonly objectsRepository: ObjectRepository) {}

  async createUser(params: CreateObjectParams): Promise<CreateObjectResult> {
    const newObject = this.objectsRepository.create({
      ...params,
    });

    const object = await this.objectsRepository.save(newObject);
    return {
      data: object,
    };
  }

  // findAll(): Promise<any[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(id): Promise<any> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
