import { PopulatedProduct } from 'src/product/types';
import { CartItem } from './cart-item.schema';
import { User } from 'src/graphql';

export type PopulatedUser = {
  cart: {
    items: PopulatedCartItem[];
  };
} & User;

export type PopulatedCartItem = Omit<CartItem, 'product'> & {
  product: PopulatedProduct;
  quantity: number;
};
