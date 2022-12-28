import { IGalleryPermission } from '../models';

export interface IGalleryPermissionRepository {
  getByUserIdAndGalleryId: (
    userId: number,
    galleryId: number,
  ) => Promise<IGalleryPermission | null>;
}
