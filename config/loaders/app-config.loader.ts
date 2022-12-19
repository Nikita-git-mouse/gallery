import { AppConfigurationInterface } from '../interfaces';

export const loadAppConfig = (): AppConfigurationInterface => ({
  app: {
    host: process.env.APP_HOST,
    port: Number(process.env.APP_PORT),
  },
});
