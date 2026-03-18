import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service.js';
import { PaginateDTO } from './dto/paginate.dto.js';
import { ProductDTO } from './dto/product.dto.js';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query('products')
  getProducts(@Args('paginate') input?: PaginateDTO) {
    return this.productService.getProducts(input);
  }

  @Query('product')
  getProductById(@Args('input') input: ProductDTO) {
    return this.productService.getProductBySlug(input);
  }
}
