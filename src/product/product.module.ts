import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductResolver } from './product.resolver.js';
import { ProductService } from './product.service.js';
import { Product, ProductSchema } from './product.schema.js';
import { MongoModule } from 'src/databases';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
