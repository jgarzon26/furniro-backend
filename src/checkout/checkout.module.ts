import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from 'src/databases';
import { Checkout, CheckoutSchema } from './checkout.schema';
import { CheckoutResolver } from './checkout.resolver';
import { CheckoutService } from './checkout.service';
import { UserModule } from 'src/user';
import { ProductModule } from 'src/product';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
    UserModule,
    ProductModule,
  ],
  providers: [CheckoutResolver, CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
