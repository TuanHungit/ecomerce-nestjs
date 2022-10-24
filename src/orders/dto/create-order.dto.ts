import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Entity } from 'typeorm';

@Entity('orders')
export class Orders {
  @ApiProperty()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amountBeforeDiscount: number;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['User', 'id'], {
    message: 'userNotExists',
  })
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'productNotExists',
  })
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  note: string;

  @ApiProperty()
  @IsNotEmpty()
  paymentMethod: string;
}
