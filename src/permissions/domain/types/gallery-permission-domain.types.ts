import { IGallery } from '../../../gallery';

export interface CheckAccessToGalleryParams {
  gallery: IGallery;
  userId: number;
}

export type CheckAccessToGalleryResult = boolean;
