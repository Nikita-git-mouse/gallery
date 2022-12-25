import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PermissionsService } from '../application';

@ApiTags('Контроллер доступа')
@Controller('permissions')
export class PermissionsController {
  constructor(private PermissionsService: PermissionsService) {}

  // @ApiOperation({ summary: 'Получение всех забаненых для галереи пользователей' })
  // @ApiResponse({ isArray: true, type: Array<any> })
  // @Get()
  // getAll() {
  //   return this.PermissionsService.findAll();
  // }

  // @Get(':id')
  // getOne(@Param('id') id: string) {
  //   return this.PermissionsService.findOne(+id);
  // }
}
