import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from './../shared/services/base.service';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannerService extends BaseService<Banner, Repository<Banner>> {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {
    super(bannerRepository, 'banner');
  }

  async create(data: DeepPartial<Banner>): Promise<Banner> {
    const maxOrderBanner = await this.findMaxByOrder();
    if (maxOrderBanner) {
      data.order = maxOrderBanner + 1;
    } else {
      data.order = 1;
    }
    return super.create(data);
  }

  async findMaxByOrder(): Promise<number> {
    const query = this.bannerRepository
      .createQueryBuilder()
      .select('MAX(Banner.order)', 'max');
    const result = await query.getRawOne();
    return result.max;
  }
}
