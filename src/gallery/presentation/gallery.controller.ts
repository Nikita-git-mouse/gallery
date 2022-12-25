import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GalleryService } from '../application';
import { GalleryDto } from './dto';
import { CreateGalleryInput } from './inputs';

@ApiTags('Контроллер галереи')
@Controller('gallery')
export class GalleryController {
  constructor(private usersService: GalleryService) {}

//   @ApiOperation({ summary: 'Создание пользователя' })
//   @ApiResponse({ type: UserDto })
//   @Post()
//   async create(@Body() input: CreateGalleryInput): Promise<any> {
//     const { data } = await this.usersService.createUser(input);

//     return data;
//   }

//   @ApiOperation({ summary: 'Получение всех пользователей' })
//   @ApiResponse({ isArray: true, type: Array<GalleryDto> })
//   @Get()
//   getAll() {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   getOne(@Param('id') id: string) {
//     return this.usersService.findOne(+id);
//   }
// }
