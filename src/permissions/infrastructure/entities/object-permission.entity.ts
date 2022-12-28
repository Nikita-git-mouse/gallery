import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IObjectPermission } from '../../domain';

import { UserEntity } from '../../../users/infrasturcture/entities'; // ************
import { ObjectEntity } from '../../../objects/infrasturcture/entities';

@Entity()
export class ObjectPermissionEntity implements IObjectPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { cascade: true })
  @JoinColumn()
  specificUser: UserEntity;

  @ManyToOne(() => ObjectEntity, { cascade: true })
  @JoinColumn()
  object: ObjectEntity;

  @Column({ default: true })
  access: boolean;
}
