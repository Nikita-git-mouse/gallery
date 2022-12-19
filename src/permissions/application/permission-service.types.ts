import { IPermission } from '../domain';

export interface CreatePermissionParams {
  email: string;
  password: string;
}

export interface CreatePermissionResult {
  data: IPermission;
}
