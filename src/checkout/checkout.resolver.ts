import { Resolver } from '@nestjs/graphql';
import { CheckoutService } from './checkout.service';

@Resolver()
export class CheckoutResolver {
  constructor(private checkoutService: CheckoutService) {}
}
