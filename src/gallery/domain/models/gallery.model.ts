import { IUser } from '../../../users';

export interface IGallery {
  id: number;
  user: IUser;
  access: boolean;
}
