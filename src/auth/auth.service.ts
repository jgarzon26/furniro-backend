import { AuthRes } from '../graphql.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { verify } from 'argon2';
import { hash } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service.js';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async login({ username, password }: LoginDto): Promise<AuthRes> {
  }

  async signup({ email, password, username }: SignupDto): Promise<AuthRes> {
  }
}
