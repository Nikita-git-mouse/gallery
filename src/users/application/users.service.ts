import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { UserRepository } from '../infrasturcture/repositories';
import { CreateUserParams, CreateUserResult } from './users-service.types';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createUser(params: CreateUserParams): Promise<CreateUserResult> {
    const newUser = this.usersRepository.create({
      ...params,
    });

    const user = await this.usersRepository.save(newUser);

    this.eventEmitter.emit('user.created', user);

    return {
      data: user,
    };
  }
}
