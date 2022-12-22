import {
  InternalServerErrorException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users';
import { AuthRepository } from '../infrasturcture';
import {
  UserRefreshTokenParams,
  UserRefreshTokenResult,
  UserSignInParams,
  UserSignInResult,
  UserSignOutParams,
  UserSignOutResult,
  UserSignUpParams,
  UserSignUpResult,
} from './auth-service.types';
import { JwtPayload, Roles } from '../core';
import { ConfigService } from '@nestjs/config';
import { ConfigInterface } from '../../../config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ConfigInterface>,
  ) {}

  async signUp(params: UserSignUpParams): Promise<UserSignUpResult> {
    const { email, middleName, name, surname, password } = params;

    try {
      const { data } = await this.userService.createUser({
        email,
        middleName,
        name,
        surname,
      });

      const hashedPassword = await this.hashPassword(password);

      const tokens = await this.generateTokens({
        id: data.id,
        role: Roles.User,
      });

      await this.authRepository.save({
        password: hashedPassword,
        user: data,
        refreshToken: tokens.refreshToken,
      });

      return { data: tokens };
    } catch (error: any) {
      if (error instanceof QueryFailedError) {
        const { message } = error;

        if (message.includes('duplicate key value')) {
          throw new BadRequestException('user already exists');
        }
      }

      console.log(error);
      throw new InternalServerErrorException('try again later');
    }
  }

  async singIn(params: UserSignInParams): Promise<UserSignInResult> {
    const { email, password } = params;

    const userCreds = await this.authRepository.findOne({
      where: {
        user: {
          email,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!userCreds) {
      throw new BadRequestException('email or password is invalid');
    }

    const isCompared = await this.comparePasswords(
      password,
      userCreds.password,
    );

    if (isCompared) {
      const tokens = await this.generateTokens({
        id: userCreds.user.id,
        role: Roles.User,
      });

      await this.authRepository.update(
        { id: userCreds.id },
        { refreshToken: tokens.refreshToken },
      );

      return {
        data: tokens,
      };
    }

    throw new BadRequestException('email or password is invalid');
  }

  async signOut(params: UserSignOutParams): Promise<UserSignOutResult> {
    const { userId } = params;

    const userCreds = await this.authRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!userCreds) {
      throw new BadRequestException('email or password is invalid');
    }

    await this.authRepository.update(
      { id: userCreds.id },
      { refreshToken: '' },
    );

    return;
  }

  async refresh(
    params: UserRefreshTokenParams,
  ): Promise<UserRefreshTokenResult> {
    const { userId } = params;

    const userCreds = await this.authRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!userCreds) {
      throw new BadRequestException('email or password is invalid');
    }
    const tokens = await this.generateTokens({
      id: userCreds.user.id,
      role: Roles.User,
    });

    await this.authRepository.update(
      { id: userCreds.id },
      { refreshToken: tokens.refreshToken },
    );

    return {
      data: tokens,
    };
  }

  private async hashPassword(password: string) {
    const salt = await genSalt(8);

    const hashPassword = await hash(password, salt);

    return `${salt}--${hashPassword}`;
  }

  private async comparePasswords(
    comparePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const [salt, password] = hashedPassword.split('--');

    return (await hash(comparePassword, salt)) === password;
  }

  private async generateTokens(payload: JwtPayload): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const {
      accessTokenExpiresIn,
      accessTokenSecretKey,
      refreshTokenExpiresIn,
      refreshTokenSecretKey,
    } = this.configService.get('jwt');

    const accessToken = await this.jwtService.sign(payload, {
      secret: accessTokenSecretKey,
      expiresIn: accessTokenExpiresIn,
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: refreshTokenSecretKey,
      expiresIn: refreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
