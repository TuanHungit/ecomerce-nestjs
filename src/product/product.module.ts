import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerModule } from 'src/banner/banner.module';
import { FilesModule } from 'src/files/files.module';
import { ModelModule } from 'src/model/model.module';
import { ReviewModule } from 'src/review/review.module';
import { TierModelModule } from 'src/tier-model/tier-model.module';
import { UsersModule } from 'src/users/users.module';
import { Product } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    BannerModule,
    TierModelModule,
    ModelModule,
    FilesModule,
    UsersModule,
    ReviewModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
