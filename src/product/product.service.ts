import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Product } from './product.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRes } from 'src/graphql.js';
import { GraphQLError } from 'graphql';
import { ProductDTO } from './dto/product.dto.js';
import { ProductsOptionDTO } from './dto/product-options.dto.js';

interface Metadata {
  totalCount: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: MongoRepository<Product>,
  ) {}

  async getProducts(input?: ProductsOptionDTO): Promise<PaginateRes> {
    if (!input) {
      const products = await this.productRepo.find();
      return {
        products,
      };
    }

    const { itemsPerPage, page, search } = input;
    const sanitizedSearch = search?.trim() ?? '';
    const productsRes = (await this.productRepo
      .aggregate([
        {
          $match: {
            title: {
              $regex: sanitizedSearch,
              $options: 'i',
            },
          },
          $facet: {
            metadata: [{ $count: 'totalCount' }],
            data: [
              { $skip: (page - 1) * itemsPerPage },
              { $limit: itemsPerPage },
            ],
          },
        },
      ])
      .toArray()) as Array<{
      metadata: Array<Metadata> | [];
      data: Product[];
    }>;

    const count = productsRes[1].metadata[0]?.totalCount ?? 0;
    const totalPages = Math.ceil(count / itemsPerPage);

    return {
      products: productsRes[1].data,
      count,
      totalPages,
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
