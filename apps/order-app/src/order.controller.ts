import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ClientGrpc } from '@nestjs/microservices';
import { OrderDataDto } from './model/order.data.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //! satesto
  // @Put('use')
  // async getUsers(@Body('email') email: string) {
  //   console.log('აქედან იგზავნება რექვესთი რომელიც მიდის orderService -ში');
  //   return await this.orderService.getUsers(email);
  // }

  @Post('create')
  async createOrder(@Body() orderData: OrderDataDto) {
    try {
      //! get user in user service
      const user = await this.orderService.getUserByID(orderData.userID);
      // console.log('orderis kontrolershi dabrunebuli useri', user);
      const result = await this.orderService.createOrder(orderData);
      return result;
    } catch (error) {
      console.log('er', error);
      // throw new BadRequestException(error.message);
      // userErrorHandler(error);
    }
  }
}
