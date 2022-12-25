import { Injectable } from '@nestjs/common';

import { GalleryService } from '../../gallery';

import { UserRepository } from '../infrasturcture/repositories';
import { CreateUserParams, CreateUserResult } from './users-service.types';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly galleryService: GalleryService,
  ) {}

  async createUser(params: CreateUserParams): Promise<CreateUserResult> {
    const newUser = this.usersRepository.create({
      ...params,
    });

    const userGallery = await this.galleryService.createGallery({
      user: newUser,
      access: false,
    });

    const user = await this.usersRepository.save(newUser);
    return {
      data: user,
    };
  }
}
