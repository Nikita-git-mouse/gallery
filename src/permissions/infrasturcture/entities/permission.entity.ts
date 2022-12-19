import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPermission } from '../../domain';

@Entity({ name: 'Permission' })
export class PermissionEntity implements IPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  banReason: string;

  @Column({ default: false })
  banned: boolean;

  @Column()
  email: string;

  @Column()
  password: string;
}
