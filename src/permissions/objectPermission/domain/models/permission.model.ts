
import { IObject } from "src/objects";
import { IUser } from "src/users";


export interface IPermission {
  id: number;
  object: IObject;
  user: IUser;
  access: boolean;
}
