import { IGallery } from '../../../gallery';
import { IGalleryPermission } from '../../domain';

export interface CheckUserPermissionToGalleryParams {
  gallery: IGallery;
  userId: number;
}

export type CheckUserPermissionToGalleryResult = boolean;

export interface GetAllByUserIdParams {
  userId: number;
}

export interface GetAllByUserIdResult {
  data: Array<IGalleryPermission>;
}

export interface DeletePermissionParams {
  userId: number;
  specificUserId: number;
}

export type DeletePermissionResult = undefined;

export interface UpdatePermissionParams {
  access: boolean;
  userId: number;
  specificUserId: number;
}

export interface UpdatePermissionResult {
  data: IGalleryPermission;
}
