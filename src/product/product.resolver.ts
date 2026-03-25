import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service.js';
import { ProductsOptionDTO } from './dto/product-options.dto.js';
import { ProductDTO } from './dto/product.dto.js';
import { ProductsRelatedOptionsDto } from './dto/product-related-options.dto.js';

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
}
