import { EntityHelper } from './../../utils/entity-helper';
import { Status } from './../../statuses/entities/status.entity';
import { FileEntity } from './../../files/entities/file.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Categories extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  logo: FileEntity | string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status | string;

  @Column()
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = `${this.name.split(' ').join('_')}_${this.id}`;
  }
}
