import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from '../../auth/infrasturcture';
import { IObject } from '../../objects';
import { IUser } from '../../users';

import { GalleryService } from '../application';

@ApiTags('Gallery')
@ApiBearerAuth()
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Patch('/change-access')
  @UseGuards(AuthGuard)
  async changeAccess(@Req() request: Request) {
    const { id } = request.user;

    return await this.galleryService.changeAccessPolicy({ userId: id });
  }

  @Get()
  @UseGuards(AuthGuard)
  async getGalleryInfo(@Req() request: Request) {
    const { id } = request.user;

    const { data } = await this.galleryService.getGalleryInfo({ userId: id });

    return data;
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
