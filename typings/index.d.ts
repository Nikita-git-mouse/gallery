import {} from '../config';
import { JwtPayload } from '../src/auth/core';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      refresh: JwtPayload;
    }
  }
}

declare module '@nestjs/config' {
  class ConfigService<Config extends Record<unknown, Record<string, unknown>>> {
    public get<ConfigKey extends keyof Config>(
      parameter: ConfigKey,
    ): Config[ConfigKey];
  }
}
