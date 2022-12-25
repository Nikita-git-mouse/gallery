import { IGallery } from "src/gallery";

export interface IObject {
    id: number;
    gallery: IGallery;
    file: any;
    type: string;
}