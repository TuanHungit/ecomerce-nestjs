import { ApiProperty } from '@nestjs/swagger';

export class ChangeOrderStatus {
  @ApiProperty()
  orderId: number;

  status: string;

  reason: string;
}
