import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

class DeleteProductDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @Validate(IsExist, ['product', 'id'], {
    message: 'Product not exists',
  })
  productId: number;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Validate(IsExist, ['model', 'id'], {
    message: 'Model not exists',
  })
  modelId?: number;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Validate(IsExist, ['tier_model', 'id'], {
    message: 'Tier model not exists',
  })
  tierModelId?: number;
}

export class DeleteProductRequestDto {
  userId: number;

  @ApiProperty({
    required: true,
    type: DeleteProductDto,
    isArray: true,
  })
  @IsOptional()
  products: DeleteProductDto[];
}
