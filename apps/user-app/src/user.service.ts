import { Inject, Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserDataDto } from './model/user.data.dto';
import { UserRepository } from './database/repository/user.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  findOne(data: any) {
    console.log(
      'user controller agzavnis user servistan da ubrunebs ukan ',
      data,
    );
    return data;
  }

  async findUserByID(userID: string) {
    // console.log('user service amushavebs am motxovnas', userID);
    // console.log('user service type', typeof userID);

    const user = await this.userRepository.findUserByID(userID);
    // console.log(
    //   'user servisma gaugzavna motxovnda user repositors da miigo pasuxi',
    //   user,
    // );
    return user;
  }

  async findUserByMobile(data: { mobile: string; telegramID: number }) {
    // console.log('user service amushavebs am motxovnas', mobile);
    // console.log('user service type', typeof userID);
    const { mobile, telegramID } = data;
    const user = await this.userRepository.findUserByMobile(mobile);
    // console.log(
    //   'user servisma gaugzavna motxovnda user repositors da miigo pasuxi',
    //   user,
    // );
    user.telegramID = telegramID;

    return await user.save();
  }

  async createUser(userData: UserDataDto) {
    const user = await this.userRepository.registerNewUser(userData);

    //!redis

    await this.cacheManager.set(`user:${user.userID}`, user);
    const cachedUser = await this.cacheManager.get(`user:${user.userID}`);
    console.log('Cached user:', cachedUser);

    //!kafka
    // this.userProxyClient.emit('user_created', user);
    return user;
  }

  async findUserInCache(userID: string) {
    const key = `user:${userID}`;
    console.log('Searching cache with key:', key);
    const cachedUser = await this.cacheManager.get(key);
    console.log('us', cachedUser);
    if (cachedUser) {
      console.log('User found in cache:', cachedUser);
      return cachedUser;
    }
  }
}
