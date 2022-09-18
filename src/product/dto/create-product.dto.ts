import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Validate,
} from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Status } from 'src/statuses/entities/status.entity';
import { Categories } from 'src/categories/entity/categories.entity';
import { TierModel } from 'src/model/entities/tier-model.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'ID of file',
  })
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  @IsNotEmpty()
  image: FileEntity | string;

  @ApiProperty({
    description: 'ID of file',
    type: Array<number>,
  })
  @IsNotEmpty()
  images: FileEntity[] | string[];

  @ApiProperty()
  @IsNumber()
  discount?: number | null;

  @ApiProperty()
  @IsNumber()
  stock?: number;

  @ApiProperty()
  @IsNumber()
  priceBeforeDiscount?: number | null;

  @ApiProperty()
  @Validate(IsExist, ['Categories', 'id'], {
    message: 'categoriesNotExists',
  })
  categories: Categories | number;

  @ApiProperty()
  @IsOptional()
  @Validate(IsExist, ['TierModel', 'id'], {
    message: 'tierModelNotExists',
  })
  tierModel?: TierModel | number;

  @ApiProperty()
  @IsOptional()
  keywords: string[] | null;

  @ApiProperty({
    example: 'ID of status',
  })
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status: Status | number;
}
