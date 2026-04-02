import { PopulatedProduct } from 'src/product/types';
import { CartItem } from './cart-item.schema';

export interface PopulatedUser {
  cart: {
    items: PopulatedCartItem[];
  };
}

export type PopulatedCartItem = Omit<CartItem, 'product'> & {
  product: PopulatedProduct;
  quantity: number;
};
