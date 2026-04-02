import { CartItem } from './cart-item.schema';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class Cart {
  @Prop({ type: [CartItem], default: [] })
  items: CartItem[];
}
