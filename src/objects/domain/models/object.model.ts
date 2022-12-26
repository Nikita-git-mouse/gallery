import { IGallery } from 'src/gallery';

export interface IObject {
  id: number;
  gallery: IGallery;
  pathToFile: string;
  type: string;
  name: string;
}
