import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService extends BaseService<Brand, Repository<Brand>>{
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {
    super(brandRepository);
  }
}
