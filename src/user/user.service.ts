import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './user.schema';
import { CartUpdateRes, SignupInput } from 'src/graphql';
import { AddCartInputDto, RemoveCartInputDto } from './dto';
import { CartItem } from './cart-item.schema';
import { ProductService } from 'src/product';
import { Category } from 'src/category';
import { PopulatedUser } from './types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private productService: ProductService,
  ) {}

  async getUser({
    email,
    uid,
    username,
  }: {
    uid?: string;
    email?: string;
    username?: string;
  }) {
    const user = await this.userModel.findOne({
      $or: [{ _id: uid }, { email }, { username }],
    });

    return user;
  }

  async getCurrentUser(uid?: string) {
    const user = await this.getUser({ uid });
    return user;
  }

  async createUser({
    email,
    password,
    username,
    role,
  }: SignupInput & { role?: UserRole }) {
    const user = new this.userModel({
      email,
      password,
      username,
      role,
    });

    return user.save();
  }

  private async getItemIndex(user: UserDocument, sku: string) {
    const prevCartItems = user.cart.items
      ? (
          await this.userModel.populate(user, {
            path: 'cart.items.product',
          })
        ).cart.items
      : ([] as CartItem[]);

    const cartItems = [...prevCartItems];
    const product = await this.productService.getProductBySku(sku);
    const itemIndex = cartItems.findIndex((item) =>
      item.product._id.equals(product._id),
    );
    return {
      cartItems,
      itemIndex,
    };
  }

  private async populateCart(user: UserDocument, updatedItems: CartItem[]) {
    user.cart.items = [...updatedItems];
    const updatedUser = await user.save();
    const { cart } = await updatedUser.populate<PopulatedUser>({
      path: 'cart.items.product',
      populate: {
        path: 'category',
        model: Category.name,
      },
    });
    return cart;
  }

  async addToCart(
    { sku, quantity }: AddCartInputDto,
    user: UserDocument,
  ): Promise<CartUpdateRes> {
    const { cartItems, itemIndex } = await this.getItemIndex(user, sku);
    let updatedItems: CartItem[] = [];

    if (itemIndex < 0) {
      const product = await this.productService.getProductBySku(sku);
      const newItem: CartItem = {
        product: product._id,
        quantity: 1,
      };
      updatedItems = [...cartItems, newItem];
    } else {
      const cartItem = cartItems[itemIndex];
      cartItems[itemIndex] = {
        ...cartItem,
        quantity: quantity ?? cartItem.quantity + 1,
      };
      updatedItems = [...cartItems];
    }

    const cart = await this.populateCart(user, updatedItems);
    return {
      cart,
      message: 'Cart Updated successfully',
    };
  }

  async removeFromCart(
    { sku, isDelete }: RemoveCartInputDto,
    user: UserDocument,
  ): Promise<CartUpdateRes> {
    const { cartItems, itemIndex } = await this.getItemIndex(user, sku);
    let updatedItems: CartItem[] = [];

    if (itemIndex < 0) {
      const userPopulated = await user.populate<PopulatedUser>({
        path: 'cart.items.product',
        populate: {
          path: 'category',
          model: Category.name,
        },
      });
      return {
        cart: userPopulated.cart,
        message: 'Failed to update cart',
      };
    }

    if (isDelete) {
      const product = await this.productService.getProductBySku(sku);
      updatedItems = cartItems.filter(
        (item) => !item.product._id.equals(product._id),
      );
    } else {
      const cartItem = cartItems[itemIndex];
      cartItems[itemIndex] = {
        ...cartItem,
        quantity: Math.max(1, cartItem.quantity - 1),
      };
      updatedItems = [...cartItems];
    }

    const cart = await this.populateCart(user, updatedItems);
    return {
      cart,
      message: 'Cart updated successfully',
    };
  }
}
