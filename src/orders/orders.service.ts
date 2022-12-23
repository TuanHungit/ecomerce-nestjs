import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty, set } from 'lodash';
import { PAYMENT_TYPE } from 'src/payments/payment.constant';
import { ProductService } from 'src/product/product.service';
import { BaseService } from 'src/shared/services/base.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderProducts } from './entity/order-products.entity';
import { Orders } from './entity/orders.entity';
import { ORDER_TYPE } from './orders.constant';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrdersService extends BaseService<Orders, Repository<Orders>> {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    @InjectRepository(OrderProducts)
    private orderProductsRepository: Repository<OrderProducts>,
    private productService: ProductService,
    private cartService: CartService,
  ) {
    super(orderRepository, 'order');
  }

  async createOrder(data: CreateOrderDto) {
    const { products } = data;
    const order = await super.create(data);
    try {
      if (!isEmpty(products)) {
        const productPromise = products.map((product) => {
          set(product, 'orderId', order.id);
          return Promise.all([
            this.productService.purchaseProduct(
              +product.productId,
              product.quantity,
              product.tierModels,
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
    const { data } = JSON.parse(JSON.stringify(decodedExtraData));
    if (!data?.userId) {
      throw new BadRequestException('Invalid pyament infomation!');
    }

    //* prepare order data
    const createOrderDto = new CreateOrderDto();
    createOrderDto.userId = data.userId;
    createOrderDto.totalAmount = data.totalAmount;
    createOrderDto.products = data.products;
    createOrderDto.note = data.note;
    createOrderDto.address = data.address;
    createOrderDto.status = ORDER_TYPE.DELIVERING;
    createOrderDto.paymentMethod = PAYMENT_TYPE.MOMO;
    createOrderDto.createdBy = data.createdBy;
    //* create pending order
    const order = await this.createOrder(createOrderDto);
    return callback(+order?.id);
  }
}
