import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { PasswordBlockerInterceptor } from 'common/interceptors/password.block.interceptor';
import { createUserDecorator } from 'common/decorator/create.user.decorator';
import { UserDataDto } from './model/user.data.dto';
import { userErrorHandler } from './errors/user.error.handler';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @GrpcMethod('UsersService', 'GetUser')
  // findOne(data) {
  //   console.log('user controller ეგზავნება დატა ');
  //   return this.userService.findOne(data);
  // }

  @GrpcMethod('UsersService', 'FindOne')
  async findUserByID(data: { userID: string }) {
    // console.log('user controler data', data.userID);
    // console.log('user controller ეგზავნება დატა ', typeof data);
    const { userID } = data;
    return await this.userService.findUserByID(userID);
  }

  @GrpcMethod('UsersService', 'FindUserByMobile')
  async findUserByMobile(data: { mobile: string; telegramID: number }) {
    console.log('user controler data', data);
    // console.log('user controller ეგზავნება დატა ', typeof data);
    const { mobile } = data;
    return await this.userService.findUserByMobile(data);
  }

  @UseInterceptors(PasswordBlockerInterceptor)
  @Post('create')
  async createUser(@createUserDecorator() userData: UserDataDto) {
    try {
      const result = await this.userService.createUser(userData);
      return result;
    } catch (error) {
      console.log('er', error);
      // throw new BadRequestException(error.message);
      userErrorHandler(error);
    }
  }

  @Get('cache/:userID')
  async getUser(@Param('userID') userID: string) {
    try {
      const profile = await this.userService.findUserInCache(userID);
      return profile;
    } catch (error) {
      userErrorHandler(error);
    }
  }
}
