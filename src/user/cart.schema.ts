import { Cart as CartGql } from 'src/graphql';
import { CartItem } from './cart-item.schema';
import { Prop } from '@nestjs/mongoose';

export class Cart implements CartGql {
  @Prop([CartItem])
  items: CartItem[];
}
