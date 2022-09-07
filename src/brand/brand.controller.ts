import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { FilterBrandDto } from './dto/filter-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Post('paging')
  @HttpCode(HttpStatus.OK)
  paging(
    @Body() filters: FilterBrandDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
    @Query('fields') fields?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.brandService.findManyWithPagination(
      {
        page,
        limit,
      },
      fields,
      { ...filters } as EntityCondition<Brand>,
      { [column]: sort },
      ['name'],
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.brandService.findOne({ id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateBannerDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandService.delete(id);
  }
}
