import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category as CategoryGQL } from '../graphql.js';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category implements CategoryGQL {
  @Prop({ unique: true })
  slug: string;

  @Prop()
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
