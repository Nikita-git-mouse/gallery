import { ReadStream } from 'fs';
import { IObject } from '../domain';

export interface AddObjectParams {
  userId: number;
  fileName: string;
  access: boolean;
  file: Express.Multer.File;
}

export interface AddObjectResult {
  data: IObject;
}

export interface GetAllObjectsParams {
  userId: number;
}

export interface GetAllObjectsResult {
  data: Array<IObject>;
}

export interface GetObjectParams {
  userId: number;
  objectId: number;
}

export interface GetObjectResult {
  data: IObject;
}

export interface GetAllAccessedObjectsByUserIdParams {
  fromUserId: number;
  userId: number;
}

export interface GetAllAccessedObjectsByUserIdResult {
  data: Array<IObject>;
}

export interface GetByUserIdAndObjectIdParams {
  userId: number;
  fromUserId: number;
  objectId: number;
}

export interface GetByUserIdAndObjectIdResult {
  data: IObject;
}

export interface GetObjectSourceParams {
  userId: number;
  objectId: number;
}

export interface GetObjectSourceResult {
  data: ReadStream;
}

export interface GetUserObjectSourceParams {
  userId: number;
  objectId: number;
  fromUserId: number;
}

export interface GetUserObjectSourceResult {
  data: ReadStream;
}

export interface DeleteObjectParams {
  userId: number;
  objectId: number;
}

export type DeleteObjectResult = undefined;

export interface UpdateObjectParams {
  userId: number;
  objectId: number;
  data: Partial<Pick<IObject, 'access' | 'name'>>;
}

export interface UpdateObjectResult {
  data: IObject;
}

export interface ChangeAccessPolicyParams {
  userId: number;
  objectId: number;
}

export type ChangeAccessPolicyResult = undefined;
