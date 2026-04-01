import { Prop } from '@nestjs/mongoose';
import { HydratedDocument, Schema } from 'mongoose';
import { CartItem as CartItemGql, Product } from 'src/graphql';

export type CartItemDocument = HydratedDocument<CartItem>;

export class CartItem implements CartItemGql {
  @Prop({ type: Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ default: 1 })
  quantity: number;
}
