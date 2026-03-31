import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category as CategoryGQL } from 'src/graphql';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category implements CategoryGQL {
  @Prop({ unique: true })
  slug: string;

  @Prop()
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
