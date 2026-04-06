import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from 'src/databases';
import { Checkout, CheckoutSchema } from './checkout.entity';
import { CheckoutResolver } from './checkout.resolver';
import { CheckoutService } from './checkout.service';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
  ],
  providers: [CheckoutResolver, CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
