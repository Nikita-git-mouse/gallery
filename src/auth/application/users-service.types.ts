import {IUser} from "../domain";

export interface CreateUserParams {
    email: string;
    password: string;
}

export interface  CreateUserResult {
    data: IUser;
}