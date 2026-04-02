import { Category } from 'src/category';
import { Product } from './product.schema';

export type PopulatedProduct = Omit<Product, 'category'> & {
  category: Category;
};
