import {
  InternalServerErrorException,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users';
import { AuthRepository, EmailService } from '../infrasturcture';
import {
  UserRefreshTokenParams,
  UserRefreshTokenResult,
  UserSignInParams,
  UserSignInResult,
  UserSignOutParams,
  UserSignOutResult,
  UserSignUpParams,
  UserSignUpResult,
  VerifyEmailParams,
  VerifyEmailResult,
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
    private readonly emailService: EmailService,
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

      const auth = await this.authRepository.save({
        password: hashedPassword,
        user: data,
      });

      const redirectUri = await this.generateAuthViaEmailRedirectUri({
        id: auth.id,
        role: Roles.User,
      });

      this.emailService.sendAuthMail({
        email,
        name,
        surname,
        redirectUri,
      });
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

    return;
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

    if (userCreds.isActivated) {
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

    throw new UnauthorizedException('email is not activated');
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

  async verifyEmail(params: VerifyEmailParams): Promise<VerifyEmailResult> {
    const { token } = params;

    const isVerified = await this.verifyTokenFromEmail(token);

    if (isVerified) {
      const { id } = isVerified;
      await this.authRepository.update({ id }, { isActivated: true });
    }

    return;
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

  private async generateAuthViaEmailRedirectUri(
    payload: JwtPayload,
  ): Promise<string> {
    const { host, port, protocol } = this.configService.get('app');
    const { emailTokenExpiresIn, emailTokenSecretKey } =
      this.configService.get('jwt');

    const token = await this.jwtService.sign(payload, {
      secret: emailTokenSecretKey,
      expiresIn: emailTokenExpiresIn,
    });

    const redirectUri = `${protocol}://${host}:${port}/api/auth/verify?token=${token}`;

    return redirectUri;
  }

  private async verifyTokenFromEmail(token: string) {
    try {
      const { emailTokenSecretKey } = this.configService.get('jwt');

      const paylaod = await this.jwtService.verify<JwtPayload>(token, {
        secret: emailTokenSecretKey,
      });

      return paylaod;
    } catch (error: any) {
      return null;
    }
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
