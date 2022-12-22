import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { ConfigInterface } from '../../../../config';
import { JwtPayload } from '../../core';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService<ConfigInterface>,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: (error?: any) => void) {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return next();
    }

    const [, token] = bearerToken.split(' ');

    const { accessTokenSecretKey } = this.configService.get('jwt');

    try {
      const isVerify = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: accessTokenSecretKey,
      });

      req.user = isVerify;
    } catch (error: any) {}

    next();
  }
}
