import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service.js';
import { Paginate } from 'src/graphql.js';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query('products')
  getProducts(@Args('paginate') input?: Paginate) {
    return this.productService.getProducts(input);
  }

  @Query('product')
  getProductById(@Args('slug') slug: string) {
    return this.productService.getProductBySlug(slug);
  }
}
