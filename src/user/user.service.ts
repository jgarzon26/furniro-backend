import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.schema.js';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
}
