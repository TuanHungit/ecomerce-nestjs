import { ApiProperty } from '@nestjs/swagger';
import { Categories } from 'src/categories/entity/categories.entity';
import { TierModel } from 'src/model/entities/tier-model.entity';
import { Status } from 'src/statuses/entities/status.entity';
import {
  AfterInsert,
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
import { FileEntity } from './../../files/entities/file.entity';
import { EntityHelper } from './../../utils/entity-helper';

@Entity()
export class Product extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @AfterInsert()
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

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  image: FileEntity | string;

  @ApiProperty()
  @OneToMany(() => FileEntity, (file) => file.product, {
    eager: true,
  })
  images: FileEntity[] | string[];

  @ApiProperty()
  @Column({ default: 0 })
  likedCount?: number;

  @ApiProperty()
  @Column()
  discount?: number | null;

  @ApiProperty()
  @Column({ default: 0 })
  stock?: number;

  @ApiProperty()
  @Column()
  price?: number;

  @ApiProperty()
  @Column()
  priceBeforeDiscount: number | null;

  @ApiProperty()
  @Column({ default: 0 })
  sold?: number | null;

  @ApiProperty()
  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status | number;

  @ApiProperty()
  @ManyToOne(() => Categories, {
    eager: true,
  })
  categories: Categories | number;

  @ApiProperty()
  @OneToOne(() => TierModel, {
    eager: true,
  })
  @JoinColumn()
  tierModel?: TierModel | number;

  @ApiProperty()
  @Column('text', { array: true, nullable: true })
  keywords?: string[] | null;

  @ApiProperty()
  @Column()
  slug?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
