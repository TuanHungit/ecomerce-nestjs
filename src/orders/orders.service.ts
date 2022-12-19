import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty, set } from 'lodash';
import { ProductService } from 'src/product/product.service';
import { BaseService } from 'src/shared/services/base.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderProducts } from './entity/order-products.entity';
import { Orders } from './entity/orders.entity';
import { ORDER_TYPE } from './orders.constant';

@Injectable()
export class OrdersService extends BaseService<Orders, Repository<Orders>> {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    @InjectRepository(OrderProducts)
    private orderProductsRepository: Repository<OrderProducts>,
    private productService: ProductService,
  ) {
    super(orderRepository, 'order');
  }

  async createOrder(data: CreateOrderDto) {
    const { products } = data;
    console.log(products);
    const order = await super.create(data);
    console.log('order', order);
    try {
      if (!isEmpty(products)) {
        const productPromise = products.map((product) => {
          set(product, 'orderId', order.id);
          return Promise.all([
            this.productService.purchaseProduct(
              +product.productId,
              product.quantity,
            ),
            this.orderProductsRepository.save(
              this.orderProductsRepository.create(product),
            ),
          ]);
        });
        await Promise.all([productPromise]);
      }
    } catch (error) {
      console.log(error);
    }

    return order;
  }

  async getOrdersByMe(
    paginationOptions: IPaginationOptions,
    wheres: FindOptionsWhere<Orders>,
  ) {
    return super.findManyWithPagination(paginationOptions, null, wheres);
  }

  async handleMomoRedirect(
    extraData: string,
    callback: (orderId: number) => void,
  ): Promise<void> {
    const decodedExtraData = JSON.parse(
      Buffer.from(extraData, 'base64').toString(),
    );
    if (!decodedExtraData?.orderId) {
      throw new BadRequestException('Invalid pyament infomation!');
    }
    await super.update(+decodedExtraData?.orderId, {
      status: ORDER_TYPE.PENDING,
    });
    return callback(+decodedExtraData?.orderId);
  }
}
