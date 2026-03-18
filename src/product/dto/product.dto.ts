import { IsNotEmpty, IsString } from 'class-validator';
import { ProductInput } from 'src/graphql.js';

export class ProductDTO extends ProductInput {
  @IsNotEmpty()
  @IsString()
  declare slug: string;
}
