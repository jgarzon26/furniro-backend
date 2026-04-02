import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema({
  _id: false,
})
export class CartItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Types.ObjectId;

  @Prop({ default: 1 })
  quantity: number;
}
