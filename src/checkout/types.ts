import { CheckoutItem } from './checkout-item.entity';
import { PopulatedProduct } from 'src/product/types';

export interface PopulatedCheckout {
  items: PopulatedCheckoutItem[];
}

export type PopulatedCheckoutItem = Omit<CheckoutItem, 'product'> & {
  product: PopulatedProduct;
};
