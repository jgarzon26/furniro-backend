import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { AuthRes } from '../graphql.js';

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

  async login({ username, password }: LoginDto): Promise<AuthRes> {}

  async signup({}: SignupDto): Promise<AuthRes> {}
}
