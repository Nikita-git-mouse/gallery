import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../domain';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false })
  middleName: string;

  @Column({ default: '' })
  profileUri: string;
}
