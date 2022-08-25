import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  create(createBrandDto: CreateBrandDto) {
    return createBrandDto;
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  // update(id: number, updateBrandDto: UpdateBrandDto) {
  //   return updateBrandDto;
  // }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
