import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GQLContext } from 'src/types';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const gqlExecutionContext = GqlExecutionContext.create(context);
    const gqlContext = gqlExecutionContext.getContext<GQLContext>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const gqlArgs = gqlExecutionContext.getArgs();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    gqlContext.req.body = { ...gqlContext.req.body, ...gqlArgs };
    return gqlContext.req;
  }
}
