import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IGallery } from '../../domain';
import { UserEntity } from '../../../users/infrasturcture/entities'; // ************
import { ObjectEntity } from '../../../objects/infrasturcture/entities';

@Entity()
export class GalleryEntity implements IGallery {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { cascade: true })
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => ObjectEntity, (entity) => entity.gallery, { cascade: true })
  objects: Array<ObjectEntity>;

  @Column({ default: true })
  access: boolean;
}
