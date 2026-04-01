import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { SignupInput } from 'src/graphql';
import { AddCartInputDto, RemoveCartInputDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getUser({
    email,
    uid,
    username,
  }: {
    uid?: string;
    email?: string;
    username?: string;
  }) {
    const user = await this.userModel.findOne({
      $or: [{ id: uid }, { email }, { username }],
    });

    return user;
  }

  async getCurrentUser(uid?: string) {
    const user = await this.getUser({ uid });
    return user;
  }

  async createUser({ email, password, username }: SignupInput) {
    const user = new this.userModel({
      email,
      password,
      username,
    });

    return user.save();
  }

  async addToCart({ sku, quantity, cart }: AddCartInputDto & UserDocument) {
    /*
      Check if the sku is found in the array of cartItems
      If exist, add quantity
      Otherwise, init CartItem
    */
  }

  async removeFromCart({
    sku,
    isDelete,
    cart,
  }: RemoveCartInputDto & UserDocument) {}
}
