import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/statuses/entities/status.entity';
import { IsOptional } from 'class-validator';

export class FilterCategoriesDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  status?: Status;
}
