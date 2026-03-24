import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service.js';
import { CategoryDto } from './dto/category.dto.js';
import { AddCategoryDto } from './dto/addCategory.dto.js';

@Resolver('Category')
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query('categories')
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Query('category')
  async getCategory(@Args('input') input: CategoryDto) {
    return this.categoryService.getCategory(input);
  }

  @Mutation('category')
  async addCategory(@Args('input') input: AddCategoryDto) {
    return this.categoryService.addCategory(input);
  }
}
