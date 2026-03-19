import { Prop } from '@nestjs/mongoose';
import { Review as ReviewGQL } from 'src/graphql.js';

export class Review implements ReviewGQL {
  @Prop()
  title: string;

  @Prop()
  comment: string;
}
