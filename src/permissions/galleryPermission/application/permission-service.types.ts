import { IPermission } from '../domain';
import { IUser } from 'src/users';

export interface CreatePermissionParams {
  user: IUser;
  access: boolean;
}

export interface CreatePermissionResult {
  data: IPermission;
}
