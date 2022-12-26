import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from '../../auth/infrasturcture';
import { ObjectService } from '../application';
import { AddObjectInput } from './inputs';

@ApiTags('Контроллер файлов для помещения в галарею')
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
    console.log({ ...input, file, userId: id });

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
}
