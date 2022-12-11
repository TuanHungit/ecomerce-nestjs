import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/statuses/entities/status.entity';
import {
  IsNotEmpty,
  Validate,
  IsUUID,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Banner } from 'src/banner/entities/banner.entity';

export class CreateCategoriesDto {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Categories'], {
    message: 'Name already exists',
  })
  name: string;

  @ApiProperty({
    description: 'ID of file',
  })
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  logo: string;

  @ApiProperty({ type: Array<number> })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  banners: Banner[] | number[];

  @ApiProperty({
    example: 'ID of status',
  })
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status: Status | number;
}
