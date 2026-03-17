import { Review as ReviewGQL } from 'src/graphql.js';
import { Column } from 'typeorm';

export class Review implements ReviewGQL {
  @Column()
  title: string;

  @Column()
  comment: string;
}
