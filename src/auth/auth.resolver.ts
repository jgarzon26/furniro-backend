import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';
import { AuthRes } from 'src/graphql';
import { LocalAuthGuard } from 'src/guards';
import { CurrentUser } from 'src/decorators';
import type { UserDocument } from 'src/user';

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
