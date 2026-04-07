import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { CheckoutStatus } from 'src/graphql';
import { CheckoutItem } from './checkout-item.entity';

export type CheckoutDocument = HydratedDocument<Checkout>;

@Schema({ timestamps: true })
export class Checkout {
  @Prop({ unique: true })
  orderId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop()
  address: string;

  @Prop({ type: String, enum: CheckoutStatus, default: CheckoutStatus.PENDING })
  status: CheckoutStatus;

  @Prop({ type: [CheckoutItem], default: [] })
  items: CheckoutItem[];
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
