import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from '../../auth/infrasturcture';
import { ObjectPermissionService } from '../application';
import { UpdatePermissionInput, DeletePermissionInput } from './inputs';

@ApiTags('Object permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('permissions/objects')
export class ObjectPermissionController {
  constructor(
    private readonly objectPermissionService: ObjectPermissionService,
  ) {}

  @Get()
  async getAllPermissions(@Req() request: Request) {
    const { id } = request.user;

    const { data } = await this.objectPermissionService.getAllByUserId({
      userId: id,
    });

    return data;
  }

  @Post('/:objectId')
  async addNewPermission(
    @Req() request: Request,
    @Body() input: UpdatePermissionInput,
    @Param() objectId: string,
  ) {
    const { id } = request.user;

    const { data } = await this.objectPermissionService.updatePermission({
      userId: id,
      ...input,
      objectId: +objectId,
    });

    return data;
  }

  @Delete('/:objectId')
  async deletePermission(
    @Req() request: Request,
    @Body() input: DeletePermissionInput,
    @Param() objectId: string,
  ) {
    const { id } = request.user;

    await this.objectPermissionService.deletePermission({
      userId: id,
      ...input,
      objectId: +objectId,
    });

    return;
  }
}
