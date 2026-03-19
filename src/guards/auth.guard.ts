import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Context } from '../types.js';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const auth = ctx.getContext<Context>().req?.headers?.authorization;
    const token = auth?.split(' ')[1];

    try {
      //TODO: validate token here
      return true;
    } catch (error) {
      //TODO: Handle error
      return false;
    }
  }
}
