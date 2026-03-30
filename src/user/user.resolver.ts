import { Context, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { type GQLContext } from '../types.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { UseGuards } from '@nestjs/common';
import { User } from '../graphql.js';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query('user')
  getCurrentUser(@Context() context: GQLContext): Promise<User> {
    const { uid } = context;
    return this.userService.getCurrentUser(uid);
  }
}
