import { IsBoolean, IsNotEmpty } from 'class-validator';
import { RemoveCartInput } from 'src/graphql';

export class RemoveCartInputDto implements RemoveCartInput {
  @IsNotEmpty()
  sku: string;

  @IsBoolean()
  isDelete?: boolean;
}
