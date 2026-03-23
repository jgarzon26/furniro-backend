import { IsNotEmpty, IsString } from 'class-validator';
import { AddCategoryInput } from '../../graphql.js';

export class AddCategoryDto implements AddCategoryInput {
  @IsString()
  @IsNotEmpty()
  title: string;
}
