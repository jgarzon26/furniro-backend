import { IsNotEmpty, IsString } from 'class-validator';
import { CategoryInput } from 'src/graphql';

export class CategoryDto implements CategoryInput {
  @IsNotEmpty()
  @IsString()
  slug: string;
}
