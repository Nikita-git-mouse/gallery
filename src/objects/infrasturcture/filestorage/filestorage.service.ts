import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { writeFile } from 'fs/promises';
import { extname, resolve } from 'path';
import { v4 } from 'uuid';

import { ConfigInterface } from '../../../../config';

@Injectable()
export class FileStorageService {
  private readonly path: string;

  constructor(private readonly configService: ConfigService<ConfigInterface>) {
    const { pathToDir } = this.configService.get('filestorage');

    this.path = pathToDir;
  }

  async saveFileViaBuffer(file: Express.Multer.File) {
    const name = `${v4()}-${Date.now()}`;
    const ext = extname(file.originalname);
    const { buffer } = file;

    const filename = `${name}${ext}`;

    await writeFile(resolve(this.path, filename), buffer);

    return { filename, extension: ext };
  }

  async createReadStreamFile(filename) {
    return createReadStream(resolve(this.path, filename));
  }
}
