import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { set } from 'lodash';
import { FilesService } from 'src/files/files.service';
import { CreateModelDto } from 'src/model/dto/create-model.dto';
import { Model } from 'src/model/entities/model.entity';
import { ModelService } from 'src/model/model.service';
import { ReviewService } from 'src/review/review.service';
import { BaseService } from 'src/shared/services/base.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { TierModel } from 'src/tier-model/entities/tier-model.entity';
import { TierModelService } from 'src/tier-model/tier-model.service';
import { UsersService } from 'src/users/users.service';
import { deepCloneObject } from 'src/utils/deep-clone-object';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService extends BaseService<Product, Repository<Product>> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private modelService: ModelService,
    private tierModelService: TierModelService,
    private fileService: FilesService,
    private userService: UsersService,
    private reviewService: ReviewService,
  ) {
    super(productRepository, 'product');
  }

  async create(data: CreateProductDto): Promise<Product> {
    // create tier-model
    const { tierModel, models } = data;
    const status = {
      id: StatusEnum.active,
      name: 'Active',
    };
    let tierModelEntity = new TierModel();
    // find tier-model by name
    try {
      tierModelEntity = await this.tierModelService.findOne({
        name: tierModel as string,
      });
    } catch (err) {
      tierModelEntity.name = tierModel as string;
      tierModelEntity.status = status;

      try {
        const newTierModel = await this.tierModelService.create(
          tierModelEntity,
        );
        tierModelEntity = newTierModel;
      } catch (err) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              message: 'Create tier-model record failed!',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // create model
    const modelPromises: Promise<Model>[] = models.map(
      (modelDto: CreateModelDto) => {
        const model = {
          ...modelDto,
          price:
            modelDto.priceBeforeDiscount -
            Math.floor((modelDto.priceBeforeDiscount * data.discount) / 100),
          status,
        };
        return this.modelService.create(model);
      },
    );

    try {
      data.models = await Promise.all(modelPromises);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: 'Create model record failed!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // find images
    await Promise.all(
      data.images?.map((id) => {
        return this.fileService.findOne({ id });
      }),
    ).then((res) => {
      data.images = res;
    });

    data.tierModel = tierModelEntity;
    return super.create(data);
  }

  async getOne(productId: number): Promise<ProductResponseDto> {
    //* get product
    const product = await super.findOne({ id: productId });
    console.log('product', product);
    //* get review
    const reviews = await this.reviewService.statisticsByRatingAndProduct(
      productId,
    );

    const ratingAvg =
      reviews?.reduce((prev, cur) => {
        return prev + cur.rating * +cur.totalReview;
      }, 0) /
      reviews?.reduce((prev, cur) => {
        return prev + +cur.totalReview;
      }, 0);

    return plainToClass(
      ProductResponseDto,
      {
        ...product,
        ratingAvg: Math.round(ratingAvg * 10) / 10,
        statisticReview: reviews,
        tierModel: {
          ...deepCloneObject(product.tierModel),
          models: product.models,
        },
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  filers(searchProductDto: SearchProductDto) {
    return searchProductDto;
  }

  async searchHint(keyword: string): Promise<string[]> {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.keywords ::text ILIKE ANY (ARRAY[:keyword::text])', {
        keyword: `%${keyword}%`,
      })
      .andWhere({ status: StatusEnum.active })
      .select('product.keywords')
      .getMany();
    if (!products) {
      return [];
    }
    let keywords: string[] = [];
    products.forEach((product) => {
      if (keywords.length === 10) return;
      keywords = [...new Set(keywords.concat(product.keywords))];
    });

    return keywords;
  }

  async searching(
    searchProductDto: SearchProductDto,
    paginationOptions: IPaginationOptions,
    fields?: string,
    wheres?: FindOptionsWhere<Product>,
    orders?: FindOptionsOrder<Product>,
    likes?: string[],
  ) {
    const selects = [];
    if (fields) {
      fields.split(',').forEach((el) => {
        if (el) {
          selects.push(el);
        }
      });
      selects.push('id');
    }
    if (likes) {
      likes.forEach((el: string) => {
        if (wheres[el]) {
          wheres[el] = Like(`%${wheres[el]}%`);
        }
      });
    }
    if (searchProductDto.categories) {
      set(wheres, 'categories', { id: searchProductDto.categories });
    }
    if (searchProductDto.brand) {
      set(wheres, 'brand', { id: searchProductDto.brand });
    }
    if (searchProductDto.fromPrice && searchProductDto.toPrice) {
      wheres.price = Between(
        searchProductDto.fromPrice,
        searchProductDto.toPrice,
      );
    }
    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await this.repository.find({
        ...(paginationOptions.page &&
          paginationOptions.limit && {
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
          }),
        ...(paginationOptions.limit && { take: paginationOptions.limit }),
        select: selects,
        where: wheres,
        order: orders,
        cache: true,
        loadEagerRelations: false,
        relations: ['image'],
      }),
      totalPages,
      paginationOptions,
    );
  }

  async like(userId: number, productId: number) {
    const user = await this.userService.findOne({ id: userId });
    const product = await super.findOne({ id: productId }, ['likedUsers']);
    if (!product.likedUsers) {
      product.likedUsers = [];
    }
    if (product.likedUsers.find((user) => user.id === userId)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: `You already like this product with id = ${productId}!`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    product.likedUsers = [...product.likedUsers, user];
    product.likedCount += 1;
    await this.productRepository.save(product);
    return true;
  }

  async unlike(userId: number, productId: number) {
    const user = await this.userService.findOne({ id: userId });
    const product = await super.findOne({ id: productId }, ['likedUsers']);
    if (!product.likedUsers) {
      product.likedUsers = [];
    }
    if (!product.likedUsers.find((likeUser) => likeUser.id === user.id)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: `You haven't liked this product with id = ${productId} yet!`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    product.likedUsers = product.likedUsers.filter(
      (likeUser) => likeUser.id !== user.id,
    );
    product.likedCount -= 1;
    await this.productRepository.save(product);
    return true;
  }
}
