import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TierModel } from 'src/tier-model/entities/tier-model.entity';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class TierModelService extends BaseService<
  TierModel,
  Repository<TierModel>
> {
  constructor(
    @InjectRepository(TierModel)
    private repositoryTierModel: Repository<TierModel>,
  ) {
    super(repositoryTierModel, 'tier-model');
  }
}
