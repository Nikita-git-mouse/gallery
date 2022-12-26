import { readFileSync } from 'fs';
import { resolve } from 'path';

import { FileStorageConfigurationInterface } from '../interfaces';

export const loadFileStorageConfig = (): FileStorageConfigurationInterface => ({
  filestorage: {
    pathToDir: resolve(process.cwd(), 'storage'),
  },
});
