import { IUser } from '../../../users';
import { IGallery } from '../../../gallery';

export interface IGalleryPermission {
  id: number;
  specificUser: IUser;
  gallery: IGallery;
  access: boolean;
}
