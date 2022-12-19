import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrasturcture/repositories';

import { CreateUserParams, CreateUserResult } from './users-service.types';
import { Roles } from '../core';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(params: CreateUserParams): Promise<CreateUserResult> {
    const newUser = this.usersRepository.create({
      ...params,
      role: Roles.User,
    });

    const user = await this.usersRepository.save(newUser);
    return {
      data: user,
    };
  }

  findAll(): Promise<any[]> {
    return this.usersRepository.find();
  }

  findOne(id): Promise<any> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
