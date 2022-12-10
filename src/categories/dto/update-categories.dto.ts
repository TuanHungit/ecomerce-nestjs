import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/statuses/entities/status.entity';
import { IsOptional, Validate, IsUUID, IsNumber } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Banner } from 'src/banner/entities/banner.entity';

export class UpdateCategoriesDto {
  @ApiProperty()
  @IsOptional()
  @Validate(IsNotExist, ['Brand'], {
    message: 'Name already exists',
  })
  name: string;

  @ApiProperty({
    description: 'ID of file',
  })
  @IsOptional()
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  logo: string;

  @ApiProperty({ type: Array<number> })
  @IsOptional()
  banners: Banner[] | number[];

  @ApiProperty({
    example: 'ID of status',
  })
  @IsOptional()
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status?: Status | number;
}
