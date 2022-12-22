import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { MomoService } from './momo/momo.service';
import { StripeService } from './stripe/stripe.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Payments')
@Controller({
  path: 'payments',
  version: '1',
})
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
  async checkoutMomo(
    @Request() request,
    @Res({ passthrough: true }) res,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    createPaymentDto.userId = request.user.id;
    createPaymentDto.createdBy = request.user.email;
    try {
      return await this.momoService.checkout(
        createPaymentDto,
        (payUrl: string) => {
          return res.redirect(payUrl);
        },
      );
      return await '';
    } catch (error) {
      return error;
    }
  }
}
