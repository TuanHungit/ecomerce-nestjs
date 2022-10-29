import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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

  @Post('momo')
  checkoutMomo() {
    try {
      return this.momoService.checkout();
    } catch (error) {
      return error;
    }
  }
}
