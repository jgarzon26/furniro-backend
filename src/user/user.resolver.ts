import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators';
import { AddCartInputDto, RemoveCartInputDto } from './dto';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards';
import type { JwtPayload } from 'src/types';
import { CartUpdateRes } from 'src/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Query('user')
  async getCurrentUser(@CurrentUser() user: JwtPayload) {
    const { sub } = user;
    const populatedUser = (
      await this.userService.getCurrentUser(sub)
    )?.populate('cart.items.product');
    return populatedUser;
  }

  @UseGuards(JwtGuard)
  @Mutation()
  async addToCart(
    @CurrentUser() { sub }: JwtPayload,
    @Args('input') input: AddCartInputDto,
  ): Promise<CartUpdateRes> {
    const user = await this.userService.getCurrentUser(sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userService.addToCart(input, user);
  }

  @UseGuards(JwtGuard)
  @Mutation()
  async removeFromCart(
    @CurrentUser() { sub }: JwtPayload,
    @Args('input') input: RemoveCartInputDto,
  ): Promise<CartUpdateRes> {
    const user = await this.userService.getCurrentUser(sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userService.removeFromCart(input, user);
  }
}
