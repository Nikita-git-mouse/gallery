import { IUser } from '../../users';
import { IGallery } from '../domain';

export interface CreateGalleryParams {
  access?: boolean;
  user: IUser;
}

export interface CreateGalleryResult {
  data: IGallery;
}

export interface ChangeGalleryAccessParams {
  userId: number;
}

export type ChangeGalleryAccessResult = undefined;
