import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  imports: [
    // NestjsPaypalPayoutsModule.register({
    //   environment: 'sandbox',
    //   clientId:
    //     'AevQWib7BmHYEqDR3UCPeyX0RkPlFoZilDKyKNstuNZkmjac2CEYVnaP6_s4zjVP1kLSZdWFvPu8YkT-',
    //   clientSecret:
    //     'EKah9RzyeuagMDCaF6JJd_7AOIYBkEwLhObUYYF19MqwlNOozAIBLKSYg0LzjYurCD0l4PTWYwouoku-',
    // }),
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
