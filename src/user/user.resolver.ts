import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import type { UserDocument } from './user.schema';
import { JwtGuard } from 'src/guards';
import { CurrentUser } from 'src/decorators';

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
