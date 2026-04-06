import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckoutService } from './checkout.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards';
import { CurrentUser } from 'src/decorators';
import type { JwtPayload } from 'src/types';
import { UserService } from 'src/user';
import { AddCheckoutInputDto } from './dto';

@UseGuards(JwtGuard)
@Resolver()
export class CheckoutResolver {
  constructor(
    private checkoutService: CheckoutService,
    private userService: UserService,
  ) {}

  @Query('checkout')
  async getCheckout(@CurrentUser() { sub }: JwtPayload) {
    const user = await this.userService.getUser({ uid: sub });
    if (!user) {
      throw new NotFoundException('User or owner of checkout does not exist');
    }

    return this.checkoutService.getCheckout(user._id);
  }

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
}
