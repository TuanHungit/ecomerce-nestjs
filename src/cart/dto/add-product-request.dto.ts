import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

class ModelRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    required: true,
    example: 'Pink',
  })
  @IsNotEmpty()
  name: string;
}

class TierModelRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    required: true,
    example: 'Màu sắc',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  model: ModelRequestDto;
}

class ProductRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @Validate(IsExist, ['product', 'id'], {
    message: 'Product not exists',
  })
  id: number;

  @ApiProperty({
    required: true,
    example: 'Apple iPhone 13 128GB',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: 150000,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class AddProductRequestDto {
  userId: number;

  @ApiProperty({
    required: true,
    type: ProductRequestDto,
  })
  @IsNotEmpty()
  product: ProductRequestDto;

  @ApiProperty({
    type: TierModelRequestDto,
  })
  @IsOptional()
  tierModel?: TierModelRequestDto;
}
