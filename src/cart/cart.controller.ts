import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddProductRequestDto } from './dto/add-product-request.dto';
import { UpdateQuantityRequestDto } from './dto/update-quantity-request.dto';

@ApiTags('Carts')
@Controller('carts')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addProduct(
    @Request() request,
    @Body() addProductRequestDto: AddProductRequestDto,
  ): Promise<boolean> {
    addProductRequestDto.userId = request.user.id;
    return await this.cartService.addProduct(addProductRequestDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('update-quantity')
  async updateQuantity(
    @Request() request,
    @Body() updateQuantityRequestDto: UpdateQuantityRequestDto,
  ): Promise<boolean> {
    updateQuantityRequestDto.userId = request.user.id;
    return await this.cartService.updateQuantity(updateQuantityRequestDto);
  }
}
