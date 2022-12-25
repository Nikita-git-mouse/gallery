import {IGallery} from "../domain";

export interface CreateGalleryParams {
    accsess: boolean;
}

export interface  CreateGalleryResult {
    data: IGallery;
}