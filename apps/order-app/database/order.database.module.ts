import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EncryptPassword } from 'common/util/encrypt.password';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrderRepository, EncryptPassword],
  exports: [OrderRepository, EncryptPassword],
})
export class OrderDatabaseModule {}
