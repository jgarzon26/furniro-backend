import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Product } from './product.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginate, PaginateRes } from 'src/graphql.js';
import { GraphQLError } from 'graphql';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: MongoRepository<Product>,
  ) {}

  async getProducts(input?: Paginate): Promise<PaginateRes> {
    if (!input) {
      const products = await this.productRepo.find();
      return {
        products,
      };
    }

    //TODO: pagination

    return {
      products: [],
    };
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { slug } });

    if (!product) {
      throw new GraphQLError(`Product ${slug} does not exist`);
    }

    return product;
  }
}
