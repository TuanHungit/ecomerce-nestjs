import { ApiProperty } from '@nestjs/swagger';
import { User } from 'aws-sdk/clients/budgets';
import { Product } from 'aws-sdk/clients/ssm';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Orders extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  amountBeforeDiscount: number;

  @ApiProperty()
  user: User;

  @ApiProperty()
  product: Product;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  paymentMethod: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  createdBy: string;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  updatedBy: string;
}
