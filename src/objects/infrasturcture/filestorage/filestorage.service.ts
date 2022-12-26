import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { ConfigInterface } from '../../../../config';

@Injectable()
export class FileStorageService {
  private readonly path: string;

  constructor(private readonly configService: ConfigService<ConfigInterface>) {
    const { pathToDir } = this.configService.get('filestorage');

    this.path = pathToDir;
  }

  async saveFile(filename, ext: string, file: Buffer) {
    await writeFile(resolve(this.path, `${filename}.${ext}`), file);
  }

  async createReadStreamFile(filename) {
    await writeFile(resolve(this.path, `${filename}.${ext}`), file);
  }
}
