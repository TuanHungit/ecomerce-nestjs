import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from 'aws-sdk/clients/directconnect';
import { IsOptional } from 'class-validator';

export class FilterBannerDto {
  @ApiProperty()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example:
      '1: main banner, 2: right banner, 3: simple big banner, 4: simple small banner, 5: left banner',
  })
  type?: number;

  @ApiProperty()
  @IsOptional()
  link?: string;

  @ApiProperty()
  @IsOptional()
  status?: Status;
}
