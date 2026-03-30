import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { type GQLContext } from '../types.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { UseGuards } from '@nestjs/common';
import { AuthRes, SignupInput, User } from '../graphql.js';
import { LoginDto } from './dto/login.dto.js';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query('user')
  getCurrentUser(@Context() context: GQLContext): Promise<User> {
    const { uid } = context;
    return this.userService.getCurrentUser(uid);
  }

  @Query('login')
  login(@Args('input') input: LoginDto): Promise<AuthRes> {
    return this.userService.login(input);
  }

  @Mutation('signup')
  signup(@Args('input') input: SignupInput): Promise<AuthRes> {
    return this.userService.signup(input);
  }
}
