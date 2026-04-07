import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module.js';
import { GraphQLModule } from './graphql/graphql.module.js';
import { CategoryModule } from './category/category.module.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CheckoutModule } from './checkout';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
    GraphQLModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    UserModule,
    CheckoutModule,
  ],
})
export class AppModule {}
