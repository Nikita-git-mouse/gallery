import { IUser } from '../../../users';
import { IObject } from '../../../objects';

export interface IObjectPermission {
  id: number;
  specificUser: IUser;
  object: IObject;
  access: boolean;
}
