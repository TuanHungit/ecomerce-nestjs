import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerService } from 'src/banner/banner.service';
import { BaseService } from 'src/shared/services/base.service';
import { DeepPartial, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { Categories } from './entity/categories.entity';

@Injectable()
export class CategoriesService extends BaseService<
  Categories,
  Repository<Categories>
> {
  constructor(
    @InjectRepository(Categories)
    private categoriesService: Repository<Categories>,
    private bannerService: BannerService,
  ) {
    super(categoriesService, 'categories');
  }

  async createWithBanners(data: CreateCategoriesDto): Promise<Categories> {
    await Promise.all(
      data.banners?.map((id) => {
        return this.bannerService.findOne({ id });
      }),
    )
      .then((res) => {
        console.log(res);
        data.banners = res;
      })
      .catch((err) => {
        delete data.banners;
        throw err;
      });
    return super.create(data as DeepPartial<Categories>);
  }

  async updateWithBanners(
    id: EntityId,
    data: UpdateCategoriesDto,
  ): Promise<Categories> {
    await Promise.all(
      data.banners?.map((id) => {
        return this.bannerService.findOne({ id });
      }),
    )
      .then((res) => {
        console.log(res);
        data.banners = res;
      })
      .catch((err) => {
        delete data.banners;
        throw err;
      });
    return super.update(id, data);
  }
}