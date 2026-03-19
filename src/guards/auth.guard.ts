import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GQLContext } from '../types.js';
import { getToken } from '../utils/token.js';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<GQLContext>();
    const token = getToken(gqlContext.req);

    try {
      //TODO: validate token here
      return true;
    } catch (error) {
      //TODO: Handle error
      return false;
    }
  }
}
