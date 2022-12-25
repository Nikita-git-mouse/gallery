import { IPermission } from '../domain';
import { IUser } from 'src/users';
import { IObject } from 'src/objects';

export interface CreatePermissionParams {
  object: IObject
  user: IUser;
  access: boolean;
}

export interface CreatePermissionResult {
  data: IPermission;
}
