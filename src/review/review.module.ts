import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { Product } from 'src/product/entity/product.entity';
import { Review } from './entity/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product]), FilesModule],
  providers: [ReviewService],
  exports: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
