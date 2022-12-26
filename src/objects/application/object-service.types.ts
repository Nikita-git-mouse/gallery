import path from 'path';
import { IObject } from '../domain';

export interface AddObjectParams {
  userId: number;
  file: Express.Multer.File;
}

export interface AddObjectResult {
  data: IObject;
}
