import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { SignupInput } from 'src/graphql.js';

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
    const user = await this.userModel.findOne({ id: uid, email, username });

    if (!user) {
      throw new NotFoundException('user');
    }

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
}
