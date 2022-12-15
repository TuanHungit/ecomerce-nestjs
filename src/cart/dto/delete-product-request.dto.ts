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
    example: '418f79b5-9c62-45ff-933a-08c0d3e17cb9',
  })
  @IsOptional()
  @IsNumber()
  @Validate(IsExist, ['model', 'id'], {
    message: 'Model not exists',
  })
  modelId?: number;

  @ApiProperty({
    example: 'd6c5f97a-77e8-48db-9a64-cc3134febcb7',
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
