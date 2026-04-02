import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Review {
  @Prop()
  title: string;

  @Prop()
  comment: string;
}
