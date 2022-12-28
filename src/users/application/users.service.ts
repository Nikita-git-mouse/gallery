import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { UserRepository } from '../infrasturcture/repositories';
import {
  CreateUserParams,
  CreateUserResult,
  GetUserByIdParams,
  GetUserByIdResult,
  UpdateUserParams,
  UpdateUserResult,
} from './users-service.types';

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

  async updateUser(params: UpdateUserParams): Promise<UpdateUserResult> {
    const { userId, email, middleName, name, surname } = params;

    const user = await this.getById({ userId });

    if (email) {
      const isExists = await this.usersRepository.exist({
        where: {
          email,
        },
      });

      if (isExists) {
        throw new BadRequestException(
          `user with email <${email} already exists>`,
        );
      }
    }

    const { raw } = await this.usersRepository.update(
      { id: user.data.id },
      { email, middleName, name, surname },
    );

    return {
      data: raw,
    };
  }

  async getById(params: GetUserByIdParams): Promise<GetUserByIdResult> {
    const { userId } = params;

    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException(`user with id <${userId}> not found`);
    }

    return {
      data: user,
    };
  }
}
