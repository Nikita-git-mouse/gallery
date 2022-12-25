import { Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from '../../auth/infrasturcture';

import { GalleryService } from '../application';

@ApiTags('Контроллер галереи')
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Patch()
  @UseGuards(AuthGuard)
  async changeAccess(@Req() request: Request) {
    const { id } = request.user;

    return await this.galleryService.changeAccessPolicy({ userId: id });
  }
}
