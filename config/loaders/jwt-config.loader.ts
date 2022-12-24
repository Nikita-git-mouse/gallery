import { readFileSync } from 'fs';
import { resolve } from 'path';

import { JwtConfigurationInterface } from '../interfaces';

export const loadJwtConfig = (): JwtConfigurationInterface => ({
  jwt: {
    accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN),
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    emailTokenExpiresIn: Number(process.env.EMAIL_TOKEN_EXPIRES_IN),
    emailTokenSecretKey: process.env.EMAIL_TOKEN_SECRET_KEY,
  },
});
