import { IUser } from '../domain';

export type CreateUserParams = Omit<IUser, 'id' | 'profileUri'>;

export interface CreateUserResult {
  data: IUser;
}
