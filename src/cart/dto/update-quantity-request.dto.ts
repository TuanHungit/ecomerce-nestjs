import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateQuantityRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  modelId?: number;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  tierModelId?: number;
}
