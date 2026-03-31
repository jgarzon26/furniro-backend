import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  ProductDTO,
  ProductRandomOptionsDto,
  ProductsOptionDTO,
  ProductsRelatedOptionsDto,
} from './dto';
import { ProductService } from './product.service.js';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query('products')
  getProducts(@Args('options') input: ProductsOptionDTO) {
    return this.productService.getProducts(input);
  }

  @Query('product')
  getProductById(@Args('input') input: ProductDTO) {
    return this.productService.getProductBySlug(input);
  }

  @Query('relatedProducts')
  getRelatedProducts(@Args('options') input: ProductsRelatedOptionsDto) {
    return this.productService.getRelatedProducts(input);
  }

  @Query('randomProducts')
  getRandomProducts(@Args('options') input: ProductRandomOptionsDto) {
    return this.productService.getRandomProducts(input);
  }
}
