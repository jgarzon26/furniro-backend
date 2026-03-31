import { IsNotEmpty, MinLength } from 'class-validator';
import { LoginInput } from 'src/graphql.js';

export class LoginDto implements LoginInput {
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  password: string;
}
