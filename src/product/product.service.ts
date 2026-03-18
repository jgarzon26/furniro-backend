import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Product } from './product.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRes } from 'src/graphql.js';
import { GraphQLError } from 'graphql';
import { ProductDTO } from './dto/product.dto.js';
import { PaginateDTO } from './dto/paginate.dto.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: MongoRepository<Product>,
  ) {}

  async getProducts(input?: PaginateDTO): Promise<PaginateRes> {
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

  async getProductBySlug({ slug }: ProductDTO): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { slug } });

    if (!product) {
      throw new GraphQLError(`Product ${slug} does not exist`);
    }

    return product;
  }
}
