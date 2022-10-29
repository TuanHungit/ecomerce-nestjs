import { Module } from '@nestjs/common';
import { MomoService } from '../momo/momo.service';
import { PaymentsController } from '../payments.controller';
import { StripeService } from './stripe.service';

@Module({
  controllers: [PaymentsController],
  providers: [StripeService, MomoService],
  exports: [StripeService],
})
export class StripeModule {}
