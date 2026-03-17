import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { generatedPath, typePaths } from './constants.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        host: config.get('HOSTNAME'),
        port: +config.get('PORT'),
        username: config.get('MONGO_INITDB_ROOT_USERNAME'),
        password: config.get('MONGO_INITDB_ROOT_PASSWORD'),
        database: config.get('MONGO_INITDB_DATABASE'),
        entities: ['./../**/*.entity{.js/.ts}'],
      }),
      inject: [ConfigService],
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
