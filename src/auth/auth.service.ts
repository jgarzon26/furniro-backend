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
    const user = await this.userService.getUser({ username });

    const isMatched = await verify(password, user.password, {
      secret: this.config.get('PASS_SECRET_KEY'),
    });

    if (!isMatched) {
      throw new UnauthorizedException();
    }

    //TODO: create token
  }

  async signup({ email, password, username }: SignupDto): Promise<AuthRes> {
    const hashPass = await hash(password, {
      hashLength: 12,
      secret: this.config.get('PASS_SECRET_KEY'),
    });

    const { id } = await this.userService.createUser({
      email,
      username,
      password: hashPass,
    });

    //TODO: create token
  }
}
