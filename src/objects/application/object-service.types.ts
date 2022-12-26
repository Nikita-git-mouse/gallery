import { IObject } from '../domain';

export interface AddObjectParams {
  userId: number;
  fileName: string;
  access: boolean;
  file: Express.Multer.File;
  accessed: Array<number>;
  banned: Array<number>;
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
