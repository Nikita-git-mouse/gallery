import { IUser } from '../domain';

export type CreateUserParams = Omit<IUser, 'id' | 'profileUri'>;

export interface CreateUserResult {
  data: IUser;
}

export interface GetUserByIdParams {
  userId: number;
}

export interface GetUserByIdResult {
  data: IUser;
}

export interface UpdateUserParams
  extends Partial<Pick<IUser, 'email' | 'middleName' | 'name' | 'surname'>> {
  userId: number;
}

export interface UpdateUserResult {
  data: IUser;
}
