import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { Orders } from './entity/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderProducts } from './entity/order-products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderProducts]), ProductModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
