import path from "path";
import {IObject} from "../domain";

export interface CreateObjectParams {
    gallery: number;
    file: any;
    type: string;
}

export interface  CreateObjectResult {
    data: IObject;
}