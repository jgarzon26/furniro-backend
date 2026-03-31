import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GraphQLError } from 'graphql';
import slugify from 'slugify';
import { Category } from './category.schema.js';
import { AddCategoryDto, CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async getCategory({ slug }: CategoryDto): Promise<Category> {
    const category = await this.categoryModel.findOne({ slug });
    if (!category) {
      throw new GraphQLError('Category not found');
    }
    return category;
  }

  async addCategory({ title }: AddCategoryDto): Promise<boolean> {
    const category = new this.categoryModel({
      title,
      slug: slugify(title, { lower: true, trim: true }),
    });

    await category.save();
    return true;
  }
}
