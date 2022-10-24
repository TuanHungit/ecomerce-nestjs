import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StripeService } from './stripe.service';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('payments/stripe')
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
