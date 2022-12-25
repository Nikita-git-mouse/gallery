import { GalleryEntity } from 'src/gallery/infrasturcture/entities';
import { UserEntity } from 'src/users/infrasturcture/entities';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IPermission } from '../../domain';



@Entity({ name: 'Permission' })
export class PermissionEntity implements IPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => GalleryEntity, { cascade: true })
  @JoinColumn()
  gallery: GalleryEntity;

  @OneToOne(() => UserEntity, { cascade: true })
  @Column({ default: '' })
  user: UserEntity;

  @Column({default: true} )
  access: boolean;

}
