import { Resolver } from '@nestjs/graphql';
import { UserService } from './user.service.js';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}
}
