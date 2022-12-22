import { Roles } from '../enums';

export interface JwtPayload {
  id: number;
  role: Roles;
}
