import { Prop, Schema } from '@nestjs/mongoose';
import { CartItem } from 'src/user/cart-item.schema';

@Schema({ _id: false })
export class CheckoutItem extends CartItem {
  @Prop()
  price: number;
}
