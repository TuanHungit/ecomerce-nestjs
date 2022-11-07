import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'productNotExists',
  })
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

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
