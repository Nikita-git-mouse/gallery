import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '../application';
import { REFRESH_TOKEN_COOKIE_NAME_TOKEN } from '../core';
import { RefreshTokenGuard } from '../infrasturcture/guards/refresh-token.guard';
import { UserSignInInput, UserSignUpInput } from './inputs';

@ApiTags('Контроллер авторизации')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async singUp(
    @Body() input: UserSignUpInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data } = await this.authService.signUp(input);

    const { accessToken, refreshToken } = data;

    this.setRefreshToken(response, refreshToken);

    return {
      accessToken,
    };
  }

  @Post('/sign-in')
  async singIn(
    @Body() input: UserSignInInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data } = await this.authService.singIn(input);

    const { accessToken, refreshToken } = data;

    this.setRefreshToken(response, refreshToken);

    return {
      accessToken,
    };
  }

  @Post('/sign-out')
  @UseGuards(RefreshTokenGuard)
  async signOut(@Req() request: Request) {
    const { id } = request.refresh;

    return this.authService.signOut({ userId: id });
  }

  @Post('/refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const { id } = request.refresh;

    const { data } = await this.authService.refresh({ userId: id });

    const { accessToken, refreshToken } = data;

    this.setRefreshToken(response, refreshToken);

    return {
      accessToken,
    };
  }

  private setRefreshToken(response: Response, refreshToken: string) {
    response.cookie(REFRESH_TOKEN_COOKIE_NAME_TOKEN, refreshToken);
  }

  private clearRefreshToken(response: Response, refreshToken: string) {
    response.clearCookie(REFRESH_TOKEN_COOKIE_NAME_TOKEN);
  }
}
