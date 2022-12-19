import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { IUser } from '../../domain';
import { Roles } from '../../core';


@Entity({name: 'user'})
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    banReason: string;

    @Column({default: false})
    banned: boolean;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({  enum: Roles })
    role: Roles;
}