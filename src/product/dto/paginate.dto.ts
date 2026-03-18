import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Paginate } from 'src/graphql.js';
import { ProductsOption } from 'src/graphql.js';

export class ProductsOptionDTO extends ProductsOption {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt({ message: 'Items per page must be a number' })
  @Min(1, { message: 'Items per page must be greater than or equal to 1' })
  declare itemsPerPage: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt({ message: 'Page must be a number' })
  @Min(1, { message: 'Page must be greater than or equal to 1' })
  declare page: number;
}
