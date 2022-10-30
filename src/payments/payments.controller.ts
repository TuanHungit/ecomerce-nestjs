import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  checkoutMomo() {
    try {
      return this.momoService.checkout();
    } catch (error) {
      return error;
    }
  }
}
