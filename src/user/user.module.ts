import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from '../databases/mongo.module.js';
import { User, UserSchema } from './user.schema.js';
import { UserResolver } from './user.resolver.js';
import { UserService } from './user.service.js';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
