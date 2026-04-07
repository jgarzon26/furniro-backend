import { ArrayMinSize, IsArray, IsNotEmpty, Min } from 'class-validator';
import { AddCheckoutInput, CheckoutInputType } from 'src/graphql';

export class AddCheckoutInputDto implements AddCheckoutInput {
  @IsArray()
  @ArrayMinSize(1)
  items: CheckoutInputTypeDto[];

  @IsNotEmpty()
  address: string;
}

class CheckoutInputTypeDto implements CheckoutInputType {
  @IsNotEmpty()
  sku: string;

  @Min(1)
  quantity: number;
}
