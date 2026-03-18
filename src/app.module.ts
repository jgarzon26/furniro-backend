import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { generatedPath, typePaths } from './constants.js';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      typePaths: [typePaths],
      definitions: {
        path: generatedPath,
        outputAs: 'class',
      },
    }),
    ProductModule,
  ],
})
export class AppModule {}
