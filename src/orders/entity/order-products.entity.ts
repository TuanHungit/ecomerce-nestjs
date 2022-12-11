import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_products')
export class OrderProducts extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  orderId: number;

  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  productId: number;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column({ nullable: true })
  amountBeforeDiscount: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column({ nullable: true })
  discount: number;
}
