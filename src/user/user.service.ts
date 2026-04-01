import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CartUpdateRes, SignupInput } from 'src/graphql';
import { AddCartInputDto, RemoveCartInputDto } from './dto';
import { CartItem } from './cart-item.schema';
import { ProductService } from 'src/product';
import { Cart } from './cart.schema';

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
      $or: [{ id: uid }, { email }, { username }],
    });

    return user;
  }

  async getCurrentUser(uid?: string) {
    const user = await this.getUser({ uid });
    return user;
  }

  async createUser({ email, password, username }: SignupInput) {
    const cart = new Cart();
    cart.items = [];

    const user = new this.userModel({
      email,
      password,
      username,
      cart,
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
    const itemIndex = cartItems.findIndex((item) => item.product.sku === sku);
    return {
      cartItems,
      itemIndex,
    };
  }

  private async populateCart(user: UserDocument, updatedItems: CartItem[]) {
    user.cart.items = [...updatedItems];
    const updatedUser = await user.save();
    const { cart } = updatedUser;
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
      const newItem = new CartItem();
      newItem.product = product;
      newItem.quantity = 1;
      updatedItems = [...cartItems, newItem];
    } else {
      const cartItem = cartItems[itemIndex];
      cartItem[itemIndex] = {
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
      return {
        cart: user.cart,
        message: 'Failed to update cart',
      };
    }

    if (isDelete) {
      updatedItems = cartItems.filter((item) => item.product.sku !== sku);
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
