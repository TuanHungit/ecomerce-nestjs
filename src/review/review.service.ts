/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectRepository } from '@nestjs/typeorm';
import { omit, pick } from 'lodash';
import { FilesService } from 'src/files/files.service';
import { Product } from 'src/product/entity/product.entity';
import { BaseService } from 'src/shared/services/base.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entity/review.entity';

export class ReviewService extends BaseService<Review, Repository<Review>> {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private fileService: FilesService,
  ) {
    super(reviewRepository, 'review');
  }

  async create(data: CreateReviewDto) {
    const product = await this.productRepository.findOne({
      where: {
        id: data.productId,
      },
    });

    data.product = {
      ...pick(product, ['id', 'name']),
    };

    // find images
    await Promise.all(
      data.files?.map((id) => {
        return this.fileService.findOne({ id });
      }),
    ).then((res) => {
      data.files = res;
    });
    data.status = {
      id: StatusEnum.active,
      name: 'Active',
    };
    const dataToSave = omit(data, ['productId', 'userId']);
    return super.create(dataToSave);
  }

  async search(
    paginationOptions: IPaginationOptions,
    wheres?: any,
    order?: any,
  ): Promise<any> {
    wheres.status = 1;
    const queryBuilder = this.repository
      .createQueryBuilder('review')
      .where({ ...omit(wheres, 'productId') })
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .orderBy(order.sort, 'ASC');
    if (wheres.productId) {
      queryBuilder.andWhere(`review.product ->> 'id' =:productId`, {
        productId: wheres.productId,
      });
      delete wheres.productId;
    }

    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await queryBuilder.getMany(),
      totalPages,
      paginationOptions,
    );
  }

  async paging(
    paginationOptions: IPaginationOptions,
    wheres?: any,
    order?: any,
  ): Promise<any> {
    const queryBuilder = this.repository
      .createQueryBuilder('review')
      .where({ ...omit(wheres, 'productId', 'userId') })
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .orderBy(order.sort, 'ASC');
    if (wheres.productId) {
      queryBuilder.andWhere(`review.product ->> 'id' =:productId`, {
        productId: wheres.productId,
      });
      delete wheres.productId;
    }

    if (wheres.userId) {
      queryBuilder.andWhere(`review.user ->> 'id' =:userId`, {
        userId: wheres.userId,
      });
      delete wheres.userId;
    }
    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await queryBuilder.getMany(),
      totalPages,
      paginationOptions,
    );
  }

  async statisticsByRatingAndProduct(productId: number) {
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .select('COUNT(review.id)', 'totalReview')
      .addSelect('review.rating', 'rating')
      .where({
        productId,
        // status: StatusEnum.active,
      })
      .groupBy('review.rating')
      .getRawMany();
    return reviews;
  }

  async changeStatus(id: number): Promise<boolean> {
    const review = await super.findOne({ id });
    const newStatus =
      review.status.id === 2
        ? {
            id: StatusEnum.active,
            name: 'Active',
          }
        : {
            id: StatusEnum.inactive,
            name: 'Inactive',
          };
    const { affected } = await this.reviewRepository.update(id, {
      status: newStatus,
    });
    return affected === 1 ? true : false;
  }
}
