import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { OrderProducts } from '../entity/order-products.entity';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'Product not exists',
  })
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  priceBeforeDiscount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;
}
export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    type: [ProductDto],
  })
  @IsNotEmpty()
  @IsArray()
  products: ProductDto[] | OrderProducts[];

  userId: string;

  @ApiProperty()
  @IsOptional()
  note: string;

  @ApiProperty()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  paymentMethod: string;

  createdBy: string;
}
