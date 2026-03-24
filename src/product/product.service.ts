import { Injectable } from '@nestjs/common';
import { Product } from './product.schema.js';
import { ProductsRes } from '../graphql.js';
import { GraphQLError } from 'graphql';
import { ProductDTO } from './dto/product.dto.js';
import { ProductsOptionDTO } from './dto/product-options.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface Metadata {
  totalCount: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async getProducts({
    itemsPerPage,
    page,
    search,
  }: ProductsOptionDTO): Promise<ProductsRes> {
    if (!page || !itemsPerPage) {
      const products = await this.productModel.find();
      return {
        items: products,
      };
    }

    const sanitizedSearch = search?.trim().toLowerCase() ?? '';
    const productsRes = await this.productModel.aggregate<{
      metadata: Array<Metadata> | [];
      data: Product[];
    }>([
      {
        $match: {
          $or: [
            {
              title: {
                $regex: sanitizedSearch,
                $options: 'i',
              },
            },
            {
              tags: {
                $elemMatch: { $regex: sanitizedSearch, $options: 'i' },
              },
            },
          ],
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [
            { $skip: (page - 1) * itemsPerPage },
            { $limit: itemsPerPage },
          ],
        },
      },
    ]);

    const count = productsRes[0].metadata[0]?.totalCount ?? 0;
    const totalPages = Math.ceil(count / itemsPerPage);

    return {
      items: productsRes[0].data,
      count,
      totalPages,
    };
  }

  async getProductBySlug({ slug }: ProductDTO): Promise<Product> {
    const product = await this.productModel.findOne({ slug });

    if (!product) {
      throw new GraphQLError(`Product ${slug} does not exist`);
    }

    return product;
  }
}
