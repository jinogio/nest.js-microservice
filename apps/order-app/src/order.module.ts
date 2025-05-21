import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import config from '../../../config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import * as dotenv from 'dotenv';
import * as dotenv from 'dotenv';
import { OrderDatabaseModule } from '../database/order.database.module';
import { grpcClientOptions } from 'gRPC/grpc.clients.options';
import { HealthModule } from './health/health.module';
dotenv.config();
@Module({
  imports: [
    OrderDatabaseModule,
    HealthModule,
    MongooseModule.forRoot(config().DATABASE.ORDER_URL),
    ConfigModule.forRoot({ load: [config] }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, '../../../protos/users.proto'),
          url: 'localhost:50051',
        },
        // ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
