import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ProductsRelatedOption } from 'src/graphql.js';

export class ProductsRelatedOptionsDto implements ProductsRelatedOption {
  @IsNumber()
  @Min(0)
  limit?: number;

  @IsNotEmpty()
  slug: string;
}
