import { IObject } from '../../../objects';
import { IUser } from '../../../users';

export interface IGallery {
  id: number;
  user: IUser;
  access: boolean;
  objects: Array<IObject>;
}
