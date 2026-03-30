import { IsNotEmpty, Min } from 'class-validator';
import { LoginInput } from 'src/graphql.js';

export class LoginDto implements LoginInput {
  @IsNotEmpty()
  username: string;

  @Min(8)
  password: string;
}
