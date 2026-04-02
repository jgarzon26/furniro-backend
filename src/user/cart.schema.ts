import { CartItem } from './cart-item.schema';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Cart {
  @Prop({ type: () => [CartItem], default: [] })
  items: CartItem[];
}
