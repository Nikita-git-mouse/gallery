import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IObject } from '../../domain';
import { GalleryEntity } from '../../../gallery/infrasturcture/entities';

@Entity()
export class ObjectEntity implements IObject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GalleryEntity, (entity) => entity.objects)
  gallery: GalleryEntity;

  @Column({ nullable: false })
  name: string;

  @Column({ default: true })
  access: boolean;

  @Column({ nullable: false, unique: true })
  pathToFile: string;

  @Column({ default: true })
  type: string;
}
