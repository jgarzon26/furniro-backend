import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckoutService } from './checkout.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards';
import { CurrentUser } from 'src/decorators';
import type { JwtPayload } from 'src/types';
import { UserService } from 'src/user';
import { AddCheckoutInputDto, ChangeOrderStatusInputDto } from './dto';

@Resolver('Checkout')
export class CheckoutResolver {
  constructor(
    private checkoutService: CheckoutService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Query('checkout')
  async getCheckout(@CurrentUser() { sub }: JwtPayload) {
    const user = await this.userService.getUser({ uid: sub });
    if (!user) {
      throw new NotFoundException('User or owner of checkout does not exist');
    }

    return this.checkoutService.getCheckout(user._id);
  }

  @UseGuards(JwtGuard)
  @Mutation('checkout')
  async checkout(
    @CurrentUser() { sub }: JwtPayload,
    @Args('input') input: AddCheckoutInputDto,
  ) {
    const user = await this.userService.getUser({ uid: sub });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return this.checkoutService.checkout(user._id, input);
  }

  @UseGuards(JwtGuard)
  @Mutation('orderStatus')
  async changeOrderStatus(@Args('input') input: ChangeOrderStatusInputDto) {
    return this.checkoutService.changeOrderStatus(input);
  }
}
