import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards';
import { CurrentUser } from './decorators/current-user.js';
import type { UserDocument } from './user.schema.js';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Query('user')
  getCurrentUser(@CurrentUser() user: UserDocument) {
    const { id } = user;
    return this.userService.getCurrentUser(id);
  }
}
