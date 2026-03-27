import { IsNumber, Min } from 'class-validator';
import { RandomProductsOption } from '../../graphql.js';

export class ProductRandomOptionsDto implements RandomProductsOption {
  @IsNumber()
  @Min(1)
  limit?: number;
}
