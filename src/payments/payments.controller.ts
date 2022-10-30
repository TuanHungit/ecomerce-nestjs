import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { MomoService } from './momo/momo.service';
import { StripeService } from './stripe/stripe.service';

@ApiTags('Payments')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller('payments')
export class PaymentsController {
  constructor(
    private stripeService: StripeService,
    private momoService: MomoService,
  ) {}

  @Post('stripe')
  checkoutStripe() {
    try {
      return this.stripeService.checkout();
    } catch (error) {
      return error;
    }
  }

  @Get('momo')
  checkoutMomo(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return this.momoService.checkout(createPaymentDto);
    } catch (error) {
      return error;
    }
  }
}
