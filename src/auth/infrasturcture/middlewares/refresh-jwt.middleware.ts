import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { ConfigInterface } from '../../../../config';
import { JwtPayload, REFRESH_TOKEN_COOKIE_NAME_TOKEN } from '../../core';

@Injectable()
export class RefreshJwtMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService<ConfigInterface>,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: (error?: any) => void) {
    const token = req.cookies[REFRESH_TOKEN_COOKIE_NAME_TOKEN];

    if (!token) {
      return next();
    }

    const { refreshTokenSecretKey } = this.configService.get('jwt');

    try {
      const isVerify = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: refreshTokenSecretKey,
      });

      req.refresh = isVerify;
    } catch (error: any) {}

    next();
  }
}
