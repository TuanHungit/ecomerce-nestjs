import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  create(@Request() request, @Body() createOrderDto: CreateOrderDto) {
    createOrderDto.userId = request.user.id;
    return this.orderService.create(createOrderDto);
  }

  @Post('paging')
  @HttpCode(HttpStatus.OK)
  paging(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
    @Query('fields') fields?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.orderService.findManyWithPagination(
      {
        page,
        limit,
      },
      fields,
      {},
      { [column]: sort },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne({ id: +id });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
