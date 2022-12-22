import { readFileSync } from 'fs';
import { resolve } from 'path';

import { AppConfigurationInterface } from '../interfaces';

export const loadAppConfig = (): AppConfigurationInterface => ({
  app: {
    host: process.env.APP_HOST,
    port: Number(process.env.APP_PORT),
    protocol: process.env.APP_PROTOCOL as any,
    ssl: {
      key: readFileSync(resolve(__dirname, '..', 'ssl', 'key.pem'), 'utf8'),
      cert: readFileSync(resolve(__dirname, '..', 'ssl', 'cert.pem'), 'utf8'),
    },
  },
});
