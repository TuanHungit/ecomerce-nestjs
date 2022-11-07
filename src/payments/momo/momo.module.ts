import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { PaymentsController } from '../payments.controller';
import { StripeService } from '../stripe/stripe.service';
import { MomoService } from './momo.service';

@Module({
  imports: [OrdersModule],
  providers: [MomoService, StripeService],
  exports: [MomoService],
  controllers: [PaymentsController],
})
export class MomoModule {}
