import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from '../../auth/infrasturcture';
import { IObject } from '../../objects';
import { IUser } from '../../users';

import { GalleryService } from '../application';

@ApiTags('Контроллер галереи')
@ApiBearerAuth()
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Patch()
  @UseGuards(AuthGuard)
  async changeAccess(@Req() request: Request) {
    const { id } = request.user;

    return await this.galleryService.changeAccessPolicy({ userId: id });
  }

  @OnEvent('user.created')
  async onUserCreated(payload: IUser) {
    await this.galleryService.createGallery({ user: payload });
  }

  @OnEvent('object.created')
  async onObjectCreated(payload: { data: IObject; userId: number }) {
    const { data, userId } = payload;

    this.galleryService.associateObjectWithGallery({ object: data, userId });
  }
}
