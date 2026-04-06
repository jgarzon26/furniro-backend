import { IsEnum, IsNotEmpty } from 'class-validator';
import { ChangeOrderStatusInput, CheckoutStatus } from 'src/graphql';

export class ChangeOrderStatusInputDto implements ChangeOrderStatusInput {
  @IsNotEmpty()
  orderId: string;

  @IsEnum(CheckoutStatus)
  status: CheckoutStatus;
}
