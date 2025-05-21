import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/schema/user.schema';
import { EncryptPassword } from 'common/util/encrypt.password';
// import config from './config/config';
import config from '../../../config/config';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
// import { KafkaUserModule } from './kafka/kafka.user.module';
import { HttpExceptionFilter } from 'common/exceptions/http.exception.filter';
import { APP_FILTER } from '@nestjs/core/constants';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { UserDatabaseModule } from './database/user.database.module';
dotenv.config();
// console.log('env', config().DATABASE.URL);
@Module({
  imports: [
    // MongooseModule.forRoot(config().DATABASE.URL),
    MongooseModule.forRoot(config().DATABASE.USER_URL),
    ConfigModule.forRoot({ load: [config] }),
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserDatabaseModule,
    // KafkaUserModule,
    //!redis
    CacheModule.register({
      store: redisStore,
      host: 'localhost', // ან შენი Redis server IP
      port: 6379,
      isGlobal: true,
      // ttl: 60 * 60, // default: 1 საათი
    }),

    // ClientsModule.register([
    //   {
    //     name: 'USER_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'user',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'user-consumer',
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: MongoDuplicateKeyFilter,
    // },
    UserService,
    UserController,
    EncryptPassword,
  ],
  exports: [UserService],
})
export class UserModule {}
