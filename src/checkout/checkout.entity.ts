import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { CheckoutStatus } from 'src/graphql';
import { CheckoutItem } from './checkout-item.entity';

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
