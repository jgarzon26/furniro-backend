import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Cart, User as UserGQL } from 'src/graphql.js';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User implements UserGQL {
  @Prop({ _id: true })
  id: string;

  @Prop()
  username: string;

  @Prop()
  displayName?: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  avatar?: string;

  @Prop()
  bio?: string;

  @Prop()
  password: string;

  @Prop({ enum: ['user', 'admin', 'moderator'], default: 'user' })
  role: string;

  @Prop(Cart)
  cart: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
