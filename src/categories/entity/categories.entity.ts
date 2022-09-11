import {
  AfterInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from './../../files/entities/file.entity';
import { Status } from './../../statuses/entities/status.entity';
import { EntityHelper } from './../../utils/entity-helper';

@Entity()
export class Categories extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  logo: FileEntity | string;

  // @OneToMany(() => BrandsCategories, (bc) => bc.categories, {
  //   cascade: true,
  // })
  // brandsCategories: BrandsCategories[] | number[];

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status | number;

  @Column({ nullable: true })
  slug: string;

  @AfterInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = `${this.name?.split(' ').join('_')}_${this.id}`.toLowerCase();
  }
}
