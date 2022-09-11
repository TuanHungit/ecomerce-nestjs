import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand } from './entities/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsNotExistSub } from 'src/utils/validators/is-not-exsist-sub.validator';
import { BrandsCategories } from 'src/categories/entity/brands-categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, BrandsCategories])],
  controllers: [BrandController],
  providers: [BrandService, IsNotExistSub],
})
export class BrandModule {}
