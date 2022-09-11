import { ApiProperty } from '@nestjs/swagger';

export class BrandCategoriesDto {
  @ApiProperty()
  banners: number[];

  @ApiProperty()
  categories: number;
}
