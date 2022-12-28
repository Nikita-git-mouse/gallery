import { IObject } from '../../../objects';

export interface GetAccessedObjectsToUserParams {
  objects: Array<IObject>;
  userId: number;
}

export type GetAccessedObjectsToUserResult = {
  objects: Array<IObject>;
};

export interface CheckAccessToUserParams {
  object: IObject;
  userId: number;
}

export type CheckAccessToUserResult = boolean;
