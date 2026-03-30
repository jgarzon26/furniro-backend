import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service.js';
import { UserModule } from 'src/user/user.module.js';
import { AuthResolver } from './auth.resolver.js';

@Module({
  imports: [ConfigModule, UserModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
