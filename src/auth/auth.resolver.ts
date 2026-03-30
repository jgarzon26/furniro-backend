import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { AuthService } from './auth.service.js';
import { AuthRes } from '../graphql.js';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query('login')
  login(@Args('input') input: LoginDto): Promise<AuthRes> {
    return this.authService.login(input);
  }

  @Mutation('signup')
  signup(@Args('input') input: SignupDto): Promise<AuthRes> {
    return this.authService.signup(input);
  }
}
