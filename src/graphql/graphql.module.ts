import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQLModuleBase } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Request, Response } from 'express';
import { generatedPath, typePaths } from 'src/constants';

@Module({
  imports: [
    GraphQLModuleBase.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      typePaths: [typePaths],
      definitions: {
        path: generatedPath,
        outputAs: 'class',
      },
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    }),
  ],
  exports: [GraphQLModuleBase],
})
export class GraphQLModule {}
