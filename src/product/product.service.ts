import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { CreateModelDto } from 'src/model/dto/create-model.dto';
import { Model } from 'src/model/entities/model.entity';
import { ModelService } from 'src/model/model.service';
import { BaseService } from 'src/shared/services/base.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { TierModel } from 'src/tier-model/entities/tier-model.entity';
import { TierModelService } from 'src/tier-model/tier-model.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService extends BaseService<Product, Repository<Product>> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private modelService: ModelService,
    private tierModelService: TierModelService,
    private fileService: FilesService,
  ) {
    super(productRepository, 'product');
  }

  async create(data: CreateProductDto): Promise<Product> {
    console.log(data);
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
}
