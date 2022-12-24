import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../../../users/infrasturcture/entities';

import { IAuth } from '../../domain';

@Entity()
export class AuthEntity implements IAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { cascade: true })
  @JoinColumn()
  user: UserEntity;

  @Column({ default: false })
  isActivated: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ default: '' })
  refreshToken: string;
}
