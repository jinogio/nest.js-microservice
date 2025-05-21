import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserDataDto } from 'apps/user-app/src/model/user.data.dto';
import { Observable, firstValueFrom } from 'rxjs';
import { OrderRepository } from '../database/repository/order.repository';
import { OrderDataDto } from './model/order.data.dto';
import { GRPCHealthIndicator } from '@nestjs/terminus';
export interface UserResponse {
  userID: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
}
interface UsersService {
  FindOne(data: { userID: string }): Observable<UserResponse>;
  FindUserByMobile(data: {
    mobile: string;
    telegramID: number;
  }): Observable<UserResponse>;
}

@Injectable()
export class OrderService implements OnModuleInit {
  private usersService: UsersService;
  constructor(
    @Inject('USERS_SERVICE') private client: ClientGrpc,
    private readonly orderRepository: OrderRepository,
    // private grpc: GRPCHealthIndicator,
  ) {}

  onModuleInit() {
    this.usersService = this.client.getService('UsersService');
  }

  // async getUsers(email: string) {
  //   console.log(
  //     'orderService-ში შემოდის მოთხოვნა, და აგზავნის userController-ში',
  //     email,
  //   );
  //   // const requestData = this.usersService.GetUser({ email: email });
  //   // return requestData;

  //   const response = await firstValueFrom(this.usersService.GetUser({ email }));
  //   console.log('userService-დან დაბრუნდა:', response);

  //   return response;
  // }

  async getUserByID(userID: string) {
    // console.log(
    //   'orderService-ში შემოდის მოთხოვნა, და აგზავნის userController-ში',
    //   userID,
    // );

    const response = await firstValueFrom(
      this.usersService.FindOne({ userID }),
    );

    // console.log('userService-დან დაბრუნდა:', response);

    return await response;
  }

  async createOrder(orderData: OrderDataDto) {
    const checkUser = await this.getUserByID(orderData.userID);
    console.log('checked user', checkUser);
    // const user = await this.userService.findOne(orderData.userID);
    // const user = await this.userService.findOne({ userID: orderData.userID });
    // console.log('order service', user.userID);
    const order = await this.orderRepository.registerNewOrder(orderData);
    return order;

    // await this.cacheManager.set(`user:${user.userID}`, user, 60 * 3600 * 1000); // 1 საათი ქეშში
    // await this.cacheManager.set(`user:${user.userID}`, user);
    // const cachedUser = await this.cacheManager.get(`user:${user.userID}`);
    // console.log('Cached user:', cachedUser);

    // this.userProxyClient.emit('user_created', user);
    // return user;
  }
}
