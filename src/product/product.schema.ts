import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category, Product as ProductGQL } from 'src/graphql';
import mongoose, { HydratedDocument } from 'mongoose';
import { Review } from './review.schema.js';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product implements ProductGQL {
  @Prop({ _id: true })
  id: string;

  @Prop({ unique: true })
  sku: string;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  description: string;

  @Prop()
  shortDescription: string;

  @Prop()
  price: number;

  @Prop()
  discountedPrice?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop([String])
  images: string[];

  @Prop([String])
  tags?: string[];

  @Prop([Review])
  reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
