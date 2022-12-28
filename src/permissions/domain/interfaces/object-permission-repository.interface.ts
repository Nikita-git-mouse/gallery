import { IObjectPermission } from '../models';

export interface IObjectPermissionRepository {
  getByUserIdAndObjectsId: (
    userId: number,
    objectsIds: Array<number>,
  ) => Promise<Array<IObjectPermission>>;

  getByUserIdAndObjectId: (
    userId: number,
    objectId: number,
  ) => Promise<IObjectPermission>;
}
