import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { Categories } from './entity/categories.entity';

@Injectable()
export class CategoriesService extends BaseService<
  Categories,
  Repository<Categories>
> {
  constructor(
    @InjectRepository(Categories)
    private categoriesService: Repository<Categories>,
  ) {
    super(categoriesService);
  }
}
