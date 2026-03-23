import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from './category.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto/category.dto.js';
import { GraphQLError } from 'graphql';
import { AddCategoryDto } from './dto/addCategory.dto.js';
import slugify from 'slugify';

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
      slug: slugify.default(title, { lower: true, trim: true }),
    });

    try {
      await category.save();
      return true;
    } catch {
      return false;
    }
  }
}
