import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver.js';
import { ProductService } from './product.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
