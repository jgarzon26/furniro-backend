import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CartItem as CartItemGql, Product } from 'src/graphql';

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema()
export class CartItem implements CartItemGql {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ default: 1 })
  quantity: number;
}
