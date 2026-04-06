import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Checkout } from './checkout.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Checkout.name)
    private checkoutModel: Model<Checkout>,
  ) {}
}
