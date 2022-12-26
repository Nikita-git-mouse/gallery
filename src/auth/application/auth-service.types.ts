import { IUser } from '../../users';

export interface UserSignUpParams extends Omit<IUser, 'id' | 'profileUri'> {
  password: string;
}

export type UserSignUpResult = undefined;

export interface UserSignInParams {
  email: string;
  password: string;
}

export type UserSignInResult = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export interface UserSignOutParams {
  userId: number;
}

export type UserSignOutResult = undefined;

export interface UserRefreshTokenParams {
  userId: number;
}

export type UserRefreshTokenResult = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export interface VerifyEmailParams {
  token: string;
}

export type VerifyEmailResult = undefined;
