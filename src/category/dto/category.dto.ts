import { IsNotEmpty, IsString } from 'class-validator';
import { CategoryInput } from '../../graphql.js';

export class CategoryDto implements CategoryInput {
  @IsNotEmpty()
  @IsString()
  slug: string;
}
