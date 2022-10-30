import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './entity/orders.entity';

@Injectable()
export class OrdersService extends BaseService<Orders, Repository<Orders>> {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    private productService: ProductService,
  ) {
    super(orderRepository, 'order');
  }

  async createOrder(data: CreateOrderDto) {
    await this.productService.purchaseProduct(+data.productId, data.amount);
    return super.create(data);
  }
}
