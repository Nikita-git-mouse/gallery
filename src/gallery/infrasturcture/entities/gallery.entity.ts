import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IGallery } from '../../domain';
import { UserEntity } from '../../../users/infrasturcture/entities'; // ************

@Entity({ name: 'gallery' })
export class GalleryEntity implements IGallery {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { cascade: true })
  @JoinColumn()
  user: UserEntity;

  @Column({ default: true })
  access: boolean;
}
