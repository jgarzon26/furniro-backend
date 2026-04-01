import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import type { UserDocument } from './user.schema';
import { CurrentUser } from 'src/decorators';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query('user')
  getCurrentUser(@CurrentUser() user: UserDocument) {
    const { id } = user;
    return this.userService.getCurrentUser(id);
  }

  @Mutation()
  addToCart() {}

  @Mutation()
  removeFromCart() {}
}
