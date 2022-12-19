import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../application';
import { UserDto } from './dto';
import { CreateUserInput } from './inputs';

@ApiTags('Контроллер пользователей')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ type: UserDto })
  @Post()
  async create(@Body() input: CreateUserInput): Promise<UserDto> {
    const { data } = await this.usersService.createUser(input);

    return data;
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ isArray: true, type: Array<UserDto> })
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
