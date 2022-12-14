import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { Repository } from 'typeorm';
import { AddProductRequestDto } from './dto/add-product-request.dto';
import { DeleteProductRequestDto } from './dto/delete-product-request.dto';
import { UpdateQuantityRequestDto } from './dto/update-quantity-request.dto';
import { Cart } from './entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async addProduct(
    addProductRequestDto: AddProductRequestDto,
  ): Promise<boolean> {
    const { userId, product, tierModel } = addProductRequestDto;
    const isProductExists = await this.updateQuantity({
      userId,
      productId: product.id,
      tierModelId: tierModel?.id,
      modelId: get(tierModel, 'model.id'),
      quantity: product.quantity,
    });
    if (isProductExists) {
      return true;
    }
    const dataToSave = {
      userId,
      product: {
        ...product,
        tierModel: tierModel,
      },
    };
    return !!(await this.cartRepository.save(
      this.cartRepository.create(dataToSave),
    ));
  }

  async updateQuantity(
    updateQuantityRequestDto: UpdateQuantityRequestDto,
  ): Promise<boolean> {
    const { userId, productId, modelId, tierModelId, quantity } =
      updateQuantityRequestDto;
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    if (quantity === 0) {
      // delete product on cart
    }
    const query = this.cartRepository
      .createQueryBuilder('cart')
      .update(Cart)
      .where({
        userId,
      })
      .set({
        product: () => `jsonb_set(product::jsonb, '{quantity}', '${quantity}')`,
      })
      .andWhere(`cart.product ->> 'id' =:productId`, {
        productId,
      });
    if (modelId && tierModelId) {
      query
        .andWhere(`cart.product -> 'tierModel' ->> 'id' =:tierModelId`, {
          tierModelId,
        })
        .andWhere(`cart.product -> 'tierModel' -> 'model' ->> 'id' =:modelId`, {
          modelId,
        });
    }
    const { affected } = await query.execute();
    return affected === 1;
  }

  async deleteProduct(dto: DeleteProductRequestDto) {
    const { userId, products } = dto;
    if (!products) {
      const { affected } = await this.cartRepository
        .createQueryBuilder('cart')
        .delete()
        .from(Cart)
        .where({
          userId,
        })
        .execute();
      return { deletedTotal: affected };
    }
    const deletedProductPromise = products?.map((product) => {
      const { productId, modelId, tierModelId } = product;
      const query = this.cartRepository
        .createQueryBuilder('cart')
        .delete()
        .from(Cart)
        .where({
          userId,
        })
        .andWhere(`cart.product ->> 'id' =:productId`, {
          productId,
        });
      if (modelId && tierModelId) {
        query
          .andWhere(`cart.product -> 'tierModel' ->> 'id' =:tierModelId`, {
            tierModelId,
          })
          .andWhere(
            `cart.product -> 'tierModel' -> 'model' ->> 'id' =:modelId`,
            {
              modelId,
            },
          );
      }
      return query.execute();
    });

    const [{ affected }] = await Promise.all(deletedProductPromise);
    return { deletedTotal: affected };
  }
}
