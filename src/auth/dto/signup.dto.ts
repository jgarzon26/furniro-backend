import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { SignupInput } from 'src/graphql.js';

export class SignupDto implements SignupInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @MinLength(8)
  password: string;
}
