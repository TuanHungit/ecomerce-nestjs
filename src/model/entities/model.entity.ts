import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TierModel } from './tier-model.entity';

@Entity()
export class Model extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  priceBeforeDiscount?: number | null;

  @Column()
  stock: number;

  @Column()
  sold?: number;

  @Column()
  image?: string;

  @ManyToOne(() => TierModel, (tm) => tm.models)
  tierModel: TierModel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
