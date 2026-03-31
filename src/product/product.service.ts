import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import {
  ProductDTO,
  ProductRandomOptionsDto,
  ProductsOptionDTO,
  ProductsRelatedOptionsDto,
} from './dto';
import { Product } from './product.schema.js';
import { ProductsRes } from 'src/graphql';

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
    const product = await this.productModel
      .findOne({ slug })
      .populate('category');

    if (!product) {
      throw new GraphQLError(`Product ${slug} does not exist`);
    }

    return product;
  }

  async getRelatedProducts({ slug, limit }: ProductsRelatedOptionsDto) {
    const currentProduct = await this.productModel.findOne(
      { slug },
      {
        category: 1,
        tags: 1,
      },
    );
    const tags = currentProduct?.tags;
    const category = currentProduct?.category;

    const products = this.productModel.aggregate([
      {
        $match: {
          $or: [
            {
              tags: {
                $in: tags,
              },
            },
            {
              'category.slug': category?.slug,
            },
          ],
        },
      },
      {
        $sample: { size: limit ?? 5 },
      },
    ]);

    return products;
  }

  async getRandomProducts({ limit }: ProductRandomOptionsDto) {
    const count = await this.productModel.countDocuments();
    const res = await this.productModel.aggregate([
      {
        $sample: { size: limit ?? count },
      },
    ]);

    const products = await this.productModel.populate(res, {
      path: 'category',
    });

    return products;
  }
}
