import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/statuses/entities/status.entity';
import {
  IsNotEmpty,
  Validate,
  IsUUID,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Banner } from 'src/banner/entities/banner.entity';

export class CreateCategoriesDto {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Categories'], {
    message: 'nameAlreadyExists',
  })
  name: string;

  @ApiProperty({
    description: 'ID of file',
  })
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  logo: string;

  @ApiProperty({ type: Array<number> })
  @IsOptional()
  banners: Banner[] | number[];

  @ApiProperty({
    example: 'ID of status',
  })
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status: Status | number;
}
