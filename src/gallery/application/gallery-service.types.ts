import { IObject } from '../../objects';
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

export interface GetGalleryByUserIdParams {
  userId: number;
}

export type GetGalleryByUserIdResult = {
  data: IGallery;
};

export interface AssociateObjectWithGalleryParams {
  object: IObject;
  userId: number;
}

export type AssociateObjectWithGalleryResult = undefined;
