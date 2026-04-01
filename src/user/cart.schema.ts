import { Cart as CartGql } from 'src/graphql';
import { CartItem } from './cart-item.schema';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Cart implements CartGql {
  @Prop({ type: () => [CartItem], default: [] })
  items: CartItem[];
}
