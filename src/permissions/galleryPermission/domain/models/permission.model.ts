import { IGallery } from "src/gallery";
import { IUser } from "src/users";


export interface IPermission {
  id: number;
  gallery: IGallery;
  user: IUser;
  access: boolean;
}
