import { PopulatedCartItem } from 'src/user/types';

export const calculateTotalPrice = (items: PopulatedCartItem[]) => {
  const totalPrice = items.reduce<number>((prev, cur) => {
    const curPrice =
      (cur.product.discountedPrice ?? cur.product.price) * cur.quantity;
    return prev + curPrice;
  }, 0);

  return +totalPrice.toFixed(2);
};
