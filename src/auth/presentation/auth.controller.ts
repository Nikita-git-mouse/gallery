import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '../application';
import { REFRESH_TOKEN_COOKIE_NAME_TOKEN } from '../core';
import { RefreshTokenGuard } from '../infrasturcture/guards/refresh-token.guard';
import { UserSignInInput, UserSignUpInput } from './inputs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async singUp(@Body() input: UserSignUpInput) {
    await this.authService.signUp(input);
  }

  @ApiExcludeEndpoint()
  @Get('/verify')
  async verifyEmail(@Query('token') token: string) {
    await this.authService.verifyEmail({ token });

    return;
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
  async signOut(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const { id } = request.refresh;

    await this.authService.signOut({ userId: id });

    this.clearRefreshToken(response);
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

  private clearRefreshToken(response: Response) {
    response.clearCookie(REFRESH_TOKEN_COOKIE_NAME_TOKEN);
  }
}
