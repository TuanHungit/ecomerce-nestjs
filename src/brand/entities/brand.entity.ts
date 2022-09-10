import { EntityHelper } from 'src/utils/entity-helper';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from './../../files/entities/file.entity';
import { Status } from './../../statuses/entities/status.entity';

@Entity()
export class Brand extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  logo: FileEntity | string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  image: FileEntity | string;

  @Column()
  description: string | null;

  @Column('int', { default: 0 })
  totalProduct: number;

  @Column()
  slug: string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status | number;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterLoad()
  setSlug() {
    this.slug = `${this.name.toLowerCase().split(' ').join('_')}_${this.id}`;
  }
}
