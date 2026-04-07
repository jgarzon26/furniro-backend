import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Cart } from './cart.schema';

export type UserDocument = HydratedDocument<User>;
export type UserJSON = Omit<User, 'password'> & { _id: Types.ObjectId };

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true })
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

  @Prop({ type: String, enum: UserRole, default: UserRole.User })
  role: UserRole;

  @Prop({
    type: Cart,
    default: {
      items: [],
    },
  })
  cart: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
