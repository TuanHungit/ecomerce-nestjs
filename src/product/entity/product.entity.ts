import { FileEntity } from './../../files/entities/file.entity';
import { EntityHelper } from './../../utils/entity-helper';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from 'src/statuses/entities/status.entity';
import { Categories } from 'src/categories/entity/categories.entity';
import { TierModel } from 'src/model/entities/tier-model.entity';

@Entity()
export class Product extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = `${this.name.split(' ').join('_')}_${this.id}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  setPrice() {
    if (this.discount) {
      this.price =
        this.priceBeforeDiscount +
        Math.floor((this.priceBeforeDiscount * this.discount) / 100);
    }
  }

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  image: FileEntity | string;

  @OneToMany(() => FileEntity, (file) => file.product, {
    eager: true,
  })
  images: FileEntity[] | string[];

  @Column()
  likedCount?: number;

  @Column()
  discount?: number | null;

  @Column()
  stock?: number;

  @Column()
  price: number;

  @Column()
  priceBeforeDiscount?: number | null;

  @Column()
  sold?: number | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @ManyToOne(() => Categories, {
    eager: true,
  })
  categories: Categories;

  @OneToOne(() => TierModel, {
    eager: true,
  })
  @JoinColumn()
  tierModel?: TierModel | null;

  @Column('text', { array: true })
  keywords: string[] | null;

  @Column()
  slug: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
