import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from 'src/databases';
import { Checkout, CheckoutSchema } from './checkout.entity';
import { CheckoutResolver } from './checkout.resolver';
import { CheckoutService } from './checkout.service';
import { UserModule } from 'src/user';
import { ProductModule } from 'src/product';

@Module({
  imports: [
    MongoModule,
    UserModule,
    ProductModule,
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
  ],
  providers: [CheckoutResolver, CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
