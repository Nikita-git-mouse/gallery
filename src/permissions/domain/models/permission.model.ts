export interface IPermission {
  id: number;
  email: string;
  password: string;
  banned: boolean;
  banReason: string;
}
