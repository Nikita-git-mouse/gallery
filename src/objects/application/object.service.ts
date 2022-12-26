import { Injectable } from '@nestjs/common';
import { ObjectRepository } from '../infrasturcture/repositories';

import { AddObjectParams, AddObjectResult } from './object-service.types';

@Injectable()
export class ObjectService {
  constructor(private readonly objectsRepository: ObjectRepository) {}

  async addObject(params: AddObjectParams): Promise<AddObjectResult> {
    return {} as any;
  }
}
