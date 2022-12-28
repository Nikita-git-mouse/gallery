import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from '../../auth/infrasturcture';
import { GalleryPermissionService } from '../application';
import { DeletePermissionInput, UpdatePermissionInput } from './inputs';

@ApiTags('Gallery permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('permissions/gallery')
export class GalleryPermissionController {
  constructor(
    private readonly galleryPermissionService: GalleryPermissionService,
  ) {}

  @Get()
  async getAllPermissions(@Req() request: Request) {
    const { id } = request.user;

    const { data } = await this.galleryPermissionService.getAllByUserId({
      userId: id,
    });

    return data;
  }

  @Post()
  async addNewPermission(
    @Req() request: Request,
    @Body() input: UpdatePermissionInput,
  ) {
    const { id } = request.user;

    const { data } = await this.galleryPermissionService.updatePermission({
      userId: id,
      ...input,
    });

    return data;
  }

  @Delete()
  async deletePermission(
    @Req() request: Request,
    @Body() input: DeletePermissionInput,
  ) {
    const { id } = request.user;

    await this.galleryPermissionService.deletePermission({
      userId: id,
      ...input,
    });

    return;
  }
}
