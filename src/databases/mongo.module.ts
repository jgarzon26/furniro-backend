import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        host: config.get('HOSTNAME'),
        port: +config.get('MONGO_PORT'),
        username: config.get('MONGO_INITDB_ROOT_USERNAME'),
        password: config.get('MONGO_INITDB_ROOT_PASSWORD'),
        database: config.get('MONGO_INITDB_DATABASE'),
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class MongoModule {}
