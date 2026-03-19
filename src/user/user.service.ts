import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getCurrentUser(uid?: string) {
    const user = await this.userModel.findById(uid);

    if (!user) {
      throw new GraphQLError('No user inputted or existed');
    }

    return user;
  }
}
