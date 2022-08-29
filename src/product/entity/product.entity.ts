import { FileEntity } from './../../files/entities/file.entity';
import { EntityHelper } from './../../utils/entity-helper';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  image: FileEntity | string;

  @OneToMany(() => FileEntity, (file) => file.product, {
    eager: true,
  })
  images: FileEntity[] | string[];

  @Column()
  liked: number;
}
