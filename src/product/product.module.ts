import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver.js';
import { ProductService } from './product.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity.js';
import { MongoModule } from '../databases/mongo.module.js';

@Module({
  imports: [MongoModule, TypeOrmModule.forFeature([Product])],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
