import { Product as ProductGQL } from 'src/graphql.js';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Review } from './review.entity.js';

@Entity()
export class Product implements ProductGQL {
  @ObjectIdColumn({
    name: '_id',
  })
  id: string;

  @Column({
    unique: true,
  })
  sku: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  shortDescription: string;

  @Column()
  price: number;

  @Column()
  discountedPrice?: number;

  @Column()
  images: string[];

  @Column()
  tags?: string[];

  @Column(() => Review)
  reviews: Review[];
}
