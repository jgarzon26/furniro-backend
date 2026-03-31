import { AuthRes } from 'src/graphql.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service.js';
import { Injectable } from '@nestjs/common';
import type { UserDocument } from 'src/user/user.schema.js';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types.js';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: LoginDto) {
    const user = await this.userService.getUser({ username });

    if (!user) {
      return null;
    }

    const isMatched = await verify(user.password, password);

    if (!isMatched) {
      return null;
    }

    return user;
  }

  login(user: UserDocument): AuthRes {
    const payload: JwtPayload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return {
      token,
      message: 'Logged in successfully',
    };
  }

  async signup({ email, password, username }: SignupDto): Promise<AuthRes> {
    const hashPass = await hash(password, {
      hashLength: 12,
    });

    const { id } = await this.userService.createUser({
      email,
      username,
      password: hashPass,
    });

    const payload: JwtPayload = { sub: id, username };
    return {
      token: this.jwtService.sign(payload),
      message: 'Sign Up successfully',
    };
  }
}
