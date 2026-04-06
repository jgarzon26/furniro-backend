import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Checkout } from './checkout.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AddCheckoutInputDto, ChangeOrderStatusInputDto } from './dto';
import { PopulatedCheckout } from './types';
import { Checkout as CheckoutGql } from 'src/graphql';
import { ProductService } from 'src/product';
import { CheckoutItem } from './checkout-item.entity';
import { generateOrderId } from 'src/util/id-generator';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Checkout.name)
    private checkoutModel: Model<Checkout>,
    private productService: ProductService,
  ) {}

  async getCheckout(ownerId?: Types.ObjectId): Promise<CheckoutGql> {
    const checkout = await this.checkoutModel
      .findOne({ user: ownerId })
      .populate<PopulatedCheckout>(['items.product', 'items.product.category']);

    if (!checkout) {
      throw new NotFoundException();
    }

    return checkout;
  }

  async checkout(
    ownerId: Types.ObjectId,
    { items, address }: AddCheckoutInputDto,
  ): Promise<CheckoutGql> {
    const checkoutItems: CheckoutItem[] = [];

    for (const item of items) {
      const product = await this.productService.getProductBySku(item.sku);
      const price = product.discountedPrice ?? product.price;
      checkoutItems.push({
        product: product._id,
        quantity: item.quantity,
        price: item.quantity * price,
      });
    }

    const checkout = new this.checkoutModel({
      orderId: generateOrderId(),
      items: checkoutItems,
      address,
      user: ownerId,
    });

    const createdCheckout = await checkout.save();
    const populatedCheckout = createdCheckout.populate<PopulatedCheckout>([
      'items.product',
      'items.product.category',
    ]);
    return populatedCheckout;
  }

  async changeOrderStatus({ orderId, status }: ChangeOrderStatusInputDto) {
    const order = await this.checkoutModel.findOne({ orderId });
    if (!order) {
      throw new NotFoundException(`Order ${orderId} does not exist`);
    }

    order.status = status;
    await order.save();
    return true;
  }
}
