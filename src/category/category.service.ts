import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from './category.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto/category.dto.js';
import { GraphQLError } from 'graphql';
import { AddCategoryDto } from './dto/addCategory.dto.js';

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

  async getCategory({ id, title }: CategoryDto): Promise<Category> {
    const category = await this.categoryModel.findOne({ id, title });
    if (!category) {
      throw new GraphQLError('Category not found');
    }
    return category;
  }

  async addCategory({ title }: AddCategoryDto): Promise<boolean> {
    const category = new this.categoryModel({
      title,
    });

    try {
      await category.save();
      return true;
    } catch {
      return false;
    }
  }
}
