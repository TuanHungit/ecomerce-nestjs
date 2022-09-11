import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { BrandsCategories } from './entity/brands-categories.entity';
import { Categories } from './entity/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, BrandsCategories])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
