import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class ProductDto {
  @ApiProperty({
    required: true,
    example: 21,
  })
  @IsNotEmpty()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'Product not exists',
  })
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: true,
    example: 24990000,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 26,
  })
  @IsOptional()
  @IsNumber()
  discount: number;
}

export class CreatePaymentDto {
  @ApiProperty({
    required: true,
    example: 18490000,
  })
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  userId: string;

  @ApiProperty({
    type: ProductDto,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  products: ProductDto[];

  @ApiProperty({
    example: 'This is note',
  })
  @IsOptional()
  note: string;

  @ApiProperty({
    example: '77/7 Tan Lap 2, Hiep Phu, Q9, TP.HCM',
  })
  @IsOptional()
  address: string;

  paymentMethod: string;

  createdBy: string;
}
