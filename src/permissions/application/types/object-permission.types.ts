import { IGallery } from '../../../gallery';
import { IObject } from '../../../objects';
import { IObjectPermission } from '../../domain';

export interface CheckUserPermissionToObjectsParams {
  objects: Array<IObject>;
  userId: number;
}

export type CheckUserPermissionToObjectsResult = {
  objects: Array<IObject>;
};

export interface CheckAccessToUserParams {
  object: IObject;
  userId: number;
}

export type CheckAccessToUserResult = boolean;

export interface GetAllObjectPermissionsByUserIdParams {
  userId: number;
}

export interface GetAllObjectPermissionsByUserIdResult {
  data: Array<IObjectPermission>;
}

export interface DeleteObjectPermissionParams {
  userId: number;
  objectId: number;
  specificUserId: number;
}

export type DeleteObjectPermissionResult = undefined;

export interface UpdateObjectPermissionParams {
  access: boolean;
  userId: number;
  objectId: number;
  specificUserId: number;
}

export interface UpdateObjectPermissionResult {
  data: IObjectPermission;
}
