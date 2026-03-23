import { Module } from '@nestjs/common';
import { MongoModule } from '../databases/mongo.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.schema.js';
import { CategoryResolver } from './category.resolver.js';
import { CategoryService } from './category.service.js';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
