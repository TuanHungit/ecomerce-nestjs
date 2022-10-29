import { Module } from '@nestjs/common';
import { PaymentsController } from '../payments.controller';
import { StripeService } from '../stripe/stripe.service';
import { MomoService } from './momo.service';

@Module({
  imports: [],
  providers: [MomoService, StripeService],
  exports: [MomoService],
  controllers: [PaymentsController],
})
export class MomoModule {}
