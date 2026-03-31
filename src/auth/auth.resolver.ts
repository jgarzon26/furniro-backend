import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignupDto } from './dto/signup.dto.js';
import { AuthService } from './auth.service.js';
import { AuthRes } from 'src/graphql.js';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards';
import { CurrentUser } from 'src/user';
import type { UserDocument } from 'src/user/user.schema.js';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query('login')
  @UseGuards(LocalAuthGuard)
  login(@CurrentUser() user: UserDocument): AuthRes {
    return this.authService.login(user);
  }

  @Mutation('signup')
  signup(@Args('input') input: SignupDto): Promise<AuthRes> {
    return this.authService.signup(input);
  }
}
