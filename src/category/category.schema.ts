import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category as CategoryGQL } from '../graphql.js';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category implements CategoryGQL {
  @Prop({ _id: true })
  id: string;

  @Prop({ unique: true })
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
