import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from '../application';
import { UpdateUserInput } from './inputs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async gutUserInfo(@Req() request: Request) {
    const { id } = request.user;

    const { data } = await this.usersService.getById({ userId: id });

    return data;
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string) {
    const { data } = await this.usersService.getById({ userId: +userId });

    return data;
  }

  @Put()
  async updateAccount(@Req() request: Request, @Body() input: UpdateUserInput) {
    const { id } = request.user;

    const { data } = await this.usersService.updateUser({
      userId: +id,
      ...input,
    });

    return data;
  }
}
