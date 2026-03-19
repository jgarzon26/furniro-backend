import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Cart, User as UserGQL } from '../graphql.js';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements UserGQL {
  @Prop({ _id: true })
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop(Cart)
  cart: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
