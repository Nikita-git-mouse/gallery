import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { IObject } from '../../domain';
import { GalleryEntity } from '../../../gallery/infrasturcture/entities';

  
  @Entity({ name: 'gallery' })
  export class ObjectEntity implements IObject {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => GalleryEntity, { cascade: true })
    @JoinColumn()
    gallery: GalleryEntity;
  
    @Column({ default: true })
    file: any;

    @Column({ default: true })
    type: string;
  }
  