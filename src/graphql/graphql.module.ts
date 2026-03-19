import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQLModuleBase } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { generatedPath, typePaths } from '../constants.js';
import { Context } from '../types.js';
import { Request, Response } from 'express';

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
      context: ({ req, res }: { req: Request; res: Response }): Context => ({
        req,
        res,
      }),
    }),
  ],
  exports: [GraphQLModuleBase],
})
export class GraphQLModule {}
