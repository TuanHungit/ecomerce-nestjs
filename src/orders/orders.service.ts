import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { Orders } from './entity/orders.entity';

@Injectable()
export class OrdersService extends BaseService<Orders, Repository<Orders>> {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
  ) {
    super(orderRepository, 'order');
  }
}
