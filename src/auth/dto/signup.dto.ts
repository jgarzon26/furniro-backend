import { IsEmail, IsNotEmpty, Min } from 'class-validator';
import { SignupInput } from '../../graphql.js';

export class SignupDto implements SignupInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @Min(8)
  password: string;
}
