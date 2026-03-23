import { IsString } from 'class-validator';
import { CategoryInput } from '../../graphql.js';

export class CategoryDto implements CategoryInput {
  @IsString()
  id?: string;
  @IsString()
  title?: string;
}
