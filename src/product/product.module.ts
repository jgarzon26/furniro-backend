import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver.js';
import { ProductService } from './product.service.js';
import { Product, ProductSchema } from './product.schema.js';
import { MongoModule } from '../databases/mongo.module.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
