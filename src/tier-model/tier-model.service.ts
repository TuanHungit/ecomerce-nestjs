import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TierModel } from 'src/tier-model/entities/tier-model.entity';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { OrderTierModelDto } from 'src/orders/dto/create-order.dto';
import { Model } from 'src/model/entities/model.entity';

@Injectable()
export class TierModelService extends BaseService<
  TierModel,
  Repository<TierModel>
> {
  constructor(
    @InjectRepository(TierModel)
    private repositoryTierModel: Repository<TierModel>,
    @InjectRepository(Model)
    private repositoryModel: Repository<Model>,
  ) {
    super(repositoryTierModel, 'tier-model');
  }

  async purchaseProduct(quantity: number, tierModels: OrderTierModelDto[]) {
    console.log(' tierModels', tierModels);
    try {
      if (tierModels.length < 2) {
        const tierModel = tierModels[0];
        const model = await this.repositoryModel.findOne({
          where: {
            id: tierModel.modelId,
          },
        });
        if (model.stock - quantity < 0) {
          throw new BadRequestException('Product sold out');
        }
        await this.repositoryModel.update(tierModel.modelId, {
          stock: () => `stock - ${quantity}`,
          sold: () => `sold + ${quantity}`,
        });
      } else if (tierModels.length === 2) {
        const parentTierModel = tierModels[0];
        const tierModel = tierModels[1];
        const where = {
          id: tierModel.modelId,
          parent: parentTierModel.tierModelId,
        };
        const model = await this.repositoryModel.findOne({
          where,
        });
        if (model.stock - quantity < 0) {
          throw new BadRequestException('Product sold out');
        }
        await this.repositoryModel.update(where, {
          stock: () => `stock - ${quantity}`,
          sold: () => `sold + ${quantity}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
