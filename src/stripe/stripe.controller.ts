import { Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  checkout() {
    try {
      return this.stripeService.checkout();
    } catch (error) {
      return error;
    }
  }
}
