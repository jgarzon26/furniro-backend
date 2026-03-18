import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQLModuleBase } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { generatedPath, typePaths } from '../constants.js';

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
    }),
  ],
  exports: [GraphQLModuleBase],
})
export class GraphQLModule {}
