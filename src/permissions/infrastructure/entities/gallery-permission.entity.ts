import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IGalleryPermission } from '../../domain';
import { UserEntity } from '../../../users/infrasturcture/entities'; // ************
import { GalleryEntity } from '../../../gallery/infrasturcture/entities';

@Entity()
export class GalleryPermissionEntity implements IGalleryPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { cascade: true })
  @JoinColumn()
  specificUser: UserEntity;

  @ManyToOne(() => GalleryEntity, { cascade: true })
  @JoinColumn()
  gallery: GalleryEntity;

  @Column({ default: true })
  access: boolean;
}
