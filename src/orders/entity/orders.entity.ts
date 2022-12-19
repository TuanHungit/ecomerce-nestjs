import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ORDER_TYPE } from '../orders.constant';

@Entity('orders')
export class Orders extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  totalAmount: number;

  @ApiProperty()
  @Column({ nullable: true })
  totalAmountBeforeDiscount: number;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: ORDER_TYPE, default: ORDER_TYPE.UNPAID })
  status: ORDER_TYPE;

  @ApiProperty()
  @Column()
  note: string;

  @ApiProperty()
  @Column({ nullable: true })
  address: string;

  @ApiProperty()
  @Column()
  paymentMethod: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  updatedBy: string;
}
