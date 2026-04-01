import { IsNotEmpty, Min } from 'class-validator';
import { AddCartInput } from 'src/graphql';

export class AddCartInputDto implements AddCartInput {
  @IsNotEmpty()
  sku: string;

  @Min(1)
  quantity?: number;
}
