import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  isUUID,
  Validate,
} from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Status } from 'src/statuses/entities/status.entity';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'productNotExists',
  })
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsOptional()
  productQuality: string;

  @ApiProperty()
  @IsOptional()
  trueToDescription: string;

  @ApiProperty()
  @IsOptional()
  review: string;

  @ApiProperty({
    description: 'ID of file',
    type: [isUUID],
  })
  @IsOptional()
  @IsUUID(4, { each: true })
  files: FileEntity[] | string[];

  status: Status;

  product: Record<string, unknown>;

  user: Record<string, unknown>;
}
