import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User as UserGQL } from 'src/graphql';
import { Cart } from './cart.schema';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator',
}

@Schema({
  timestamps: true,
})
export class User implements UserGQL {
  @Prop({ _id: true })
  id: string;

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

  @Prop(Cart)
  cart: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
