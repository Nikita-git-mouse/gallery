import { IGallery } from 'src/gallery';

export interface IObject {
  id: number;
  gallery: IGallery;
  pathToFile: string;
  access: boolean;
  type: string;
  name: string;
}
