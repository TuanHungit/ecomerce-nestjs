import { Module } from '@nestjs/common';
import { TierModelService } from './tier-model.service';
import { TierModelController } from './tier-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TierModel } from './entities/tier-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TierModel])],
  controllers: [TierModelController],
  providers: [TierModelService],
  exports: [TierModelService],
})
export class TierModelModule {}