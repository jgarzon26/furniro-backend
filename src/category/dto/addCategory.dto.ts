import { IsNotEmpty, IsString } from 'class-validator';
import { AddCategoryInput } from 'src/graphql';

export class AddCategoryDto implements AddCategoryInput {
  @IsString()
  @IsNotEmpty()
  title: string;
}
