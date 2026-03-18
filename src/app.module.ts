import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module.js';
import { GraphQLModule } from './graphql/graphql.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
    GraphQLModule,
    ProductModule,
  ],
})
export class AppModule {}
