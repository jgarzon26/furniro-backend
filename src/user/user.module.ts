import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MongoModule } from 'src/databases/mongo.module';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
