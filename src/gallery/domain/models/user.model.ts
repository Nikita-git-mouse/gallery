import {Roles} from "../../core";

export interface IUser {
    id: number;
    email: string;
    password: string;
    banned: boolean;
    banReason: string;
    role: Roles;
}