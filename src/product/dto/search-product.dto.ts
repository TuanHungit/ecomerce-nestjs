import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchProductDto {
  @ApiProperty()
  @IsOptional()
  categories?: number | null;

  @ApiProperty()
  @IsOptional()
  brand?: number | null;

  @ApiProperty()
  @IsOptional()
  fromPrice?: number | null;

  @ApiProperty()
  @IsOptional()
  toPrice?: number | null;

  @ApiProperty()
  @IsOptional()
  rating: number | null;
}
