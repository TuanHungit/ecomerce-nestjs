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
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'Product not exists',
  })
  productId: number;

  @ApiProperty({
    required: true,
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: 'Nice',
  })
  @IsOptional()
  productQuality?: string;

  @ApiProperty({
    example: 'Yes',
  })
  @IsOptional()
  trueToDescription?: string;

  @ApiProperty({
    example: 'This is a review',
  })
  @IsOptional()
  review: string;

  @ApiProperty({
    example: '1650196b-79cd-4f1c-b61b-c09558262883',
    type: isUUID,
    isArray: true,
  })
  @IsOptional()
  @IsUUID(4, { each: true })
  files: FileEntity[] | string[];

  status: Status;

  product: Record<string, unknown>;

  user: Record<string, unknown>;
}
