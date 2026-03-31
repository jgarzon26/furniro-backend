import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
import { UserModule } from 'src/user/user.module.js';
import { AuthResolver } from './auth.resolver.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from 'src/strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
