import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ObjectService } from '../application';
import { ObjectDto } from './dto';
import { CreateObjectInput } from './inputs';

@ApiTags('Контроллер файлов для помещения в галарею')
@Controller('objects')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @ApiOperation({ summary: 'Создание нового файла' })
  @ApiResponse({ type: ObjectDto })
  @Post()
  async create(@Body() input: CreateObjectInput): Promise<ObjectDto> {
    const { data } = await this.objectService.createUser(input);

    return data;
  }

  // @ApiOperation({ summary: 'Получение всех файлов пользователя' })
  // @ApiResponse({ isArray: true, type: Array<ObjectDto> })
  // @Get()
  // getAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // getOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
}
