import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthGuard } from '../../auth/infrasturcture';
import { ObjectService } from '../application';
import { AddObjectInput, UpdateObjectInput } from './inputs';

@ApiTags('Objects')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('objects')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @Post()
  @UseInterceptors(FileInterceptor('object'))
  @ApiConsumes('multipart/form-data')
  async addNewObject(
    @Req() request: Request,
    @Body() input: AddObjectInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { id } = request.user;

    const { data } = await this.objectService.addObject({
      ...input,
      file,
      userId: id,
    });

    return data;
  }

  @Get()
  async getAllObjects(@Req() request: Request) {
    const { id } = request.user;

    const { data } = await this.objectService.getAllUserObjects({ userId: id });

    return data;
  }

  @Get('/:objectId')
  async getObject(
    @Req() request: Request,
    @Param('objectId') objectId: string,
  ) {
    const { id } = request.user;

    const { data } = await this.objectService.getObject({
      objectId: +objectId,
      userId: id,
    });

    return data;
  }

  @Patch('/:objectId/change-access')
  async changeAccessToObject(
    @Req() request: Request,
    @Param('objectId') objectId: string,
  ) {
    const { id } = request.user;

    await this.objectService.changeAccessPolicy({
      objectId: +objectId,
      userId: id,
    });
  }

  @Put('/:objectId')
  async updateObject(
    @Req() request: Request,
    @Param('objectId') objectId: string,
    @Body() input: UpdateObjectInput,
  ) {
    const { id } = request.user;

    await this.objectService.updateObject({
      objectId: +objectId,
      userId: id,
      data: input,
    });
  }

  @Delete('/:objectId')
  async deleteObject(
    @Req() request: Request,
    @Param('objectId') objectId: string,
  ) {
    const { id } = request.user;

    await this.objectService.deleteObject({
      objectId: +objectId,
      userId: id,
    });
  }

  @Get('/:objectId/source')
  async getObjectSource(
    @Req() request: Request,
    @Res() response: Response,
    @Param('objectId') objectId: string,
  ) {
    const { id } = request.user;

    const { data } = await this.objectService.getObjectSource({
      objectId: +objectId,
      userId: id,
    });

    return data.pipe(response);
  }

  @Get('/users/:userId')
  async getAllAccessedObjectsByUserId(
    @Req() request: Request,
    @Param('userId') userId: string,
  ) {
    const { id } = request.user;

    const { data } = await this.objectService.getAllAccessedObjectsByUserId({
      fromUserId: id,
      userId: +userId,
    });

    return data;
  }

  @Get('/users/:userId/:objectId')
  async getObjectByUserId(
    @Req() request: Request,
    @Param('userId') userId: string,
    @Param('objectId') objectId: string,
  ) {
    const { id } = request.user;

    const { data } = await this.objectService.getByUserIdAndObjectId({
      fromUserId: id,
      objectId: +objectId,
      userId: +userId,
    });

    return data;
  }

  @Get('/users/:userId/:objectId/source')
  async getUserObjectSource(
    @Req() request: Request,
    @Res() response: Response,
    @Param('userId') userId: string,
    @Param('objectId') objectId: string,
  ) {
    const { id } = request.user;

    const { data } = await this.objectService.getUserObjectSource({
      objectId: +objectId,
      fromUserId: id,
      userId: +userId,
    });

    return data.pipe(response);
  }
}
