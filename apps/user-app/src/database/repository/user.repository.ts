import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
// import { generateUUIDV4 } from 'src/common/helper/generate.uuidv4';
import { generateUUIDV4 } from 'common/helper/generate.uuidv4';
// import { EncryptPassword } from 'src/common/util/encrypt.password';
import { EncryptPassword } from 'common/util/encrypt.password';
// import { IUserDataDto } from 'src/modules/user/models/user.data.dto';
import { UserDataDto } from '../../model/user.data.dto';
// import { IUserFilterDataDto } from 'src/modules/user/models/user.filter.data.dto';
// import { endOfDay, startOfDay } from 'src/common/constant/times';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: SoftDeleteModel<User>,
    private readonly encryptPassword: EncryptPassword,
  ) {}

  async findUserByIDWithoutPassword(userID: string): Promise<User> {
    return this.userModel
      .findOne({ userID: userID, isDeleted: false })
      .select(['-password', '-__v']);
  }

  async findUserByID(userID: string) {
    // console.log('user repo aq unda movides', data);
    // console.log('type of', typeof data);

    const user = await this.userModel.findOne({
      userID: userID,
      isDeleted: false,
    });
    // console.log('user repo', user);
    return user;
  }

  async findUserByMobile(mobile: string) {
    // console.log('user repo aq unda movides', data);
    // console.log('type of', typeof data);

    const user = await this.userModel.findOne({
      mobile: mobile,
      isDeleted: false,
    });
    // console.log('user repo', user);
    return user;
  }

  async findUserByResetCode(passwordResetCode: string): Promise<User> {
    return this.userModel.findOne({
      passwordResetCode: passwordResetCode,
      isDeleted: false,
    });
  }

  async findcompanyUsersList(companyID: string): Promise<User[]> {
    return this.userModel.find({ companyID: companyID });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email, isDeleted: false });
  }

  async findUserByEmailAndIdCard(email: string, idCard: string): Promise<User> {
    return this.userModel.findOne({
      email: email,
      idCard: idCard,
      isDeleted: false,
    });
  }

  async userPagination(companyID: string, page: number, size: number) {
    return await await this.userModel
      .find({ companyID: companyID })
      .sort({ _id: 'asc' })
      .skip((page - 1) * size)
      .limit(size);
  }

  async deleteUser(userID: string): Promise<{ deleted: number }> {
    return this.userModel.softDelete({ userID: userID });
  }

  async restoreUser(userID: string): Promise<{ restored: number }> {
    return this.userModel.restore({ userID: userID });
  }

  async findDeletedUsers() {
    return this.userModel.findDeleted();
  }

  async registerNewUser(userData: UserDataDto): Promise<Partial<User>> {
    const hashedPassword = await this.encryptPassword.encrypt(
      userData.password,
    );
    return await this.userModel.create({
      ...userData,
      userID: generateUUIDV4(),
      password: hashedPassword,
    });
  }

  async getCompanyUsersList(companyID: string): Promise<User[]> {
    return this.userModel.find({ companyID: companyID });
  }

  // async filterUser(userFilterData: IUserFilterDataDto) {
  //   const todayStart = startOfDay(new Date(userFilterData.createdAt.from));
  //   const todayEnd = endOfDay(new Date(userFilterData.createdAt.to));

  //   const searchParams = {};
  //   if (userFilterData.createdAt.from !== '' && userFilterData.createdAt.to) {
  //     searchParams['createdAt'] = {
  //       $gte: todayStart,
  //       $lte: todayEnd,
  //     };
  //   }

  //   if (userFilterData.firstname !== '') {
  //     searchParams['firstname'] = userFilterData.firstname;
  //   }

  //   if (userFilterData.lastname !== '') {
  //     searchParams['lastname'] = userFilterData.lastname;
  //   }
  //   if (userFilterData.idCard !== '') {
  //     searchParams['idCard'] = userFilterData.idCard;
  //   }
  //   if (userFilterData.mobile !== '') {
  //     searchParams['mobile'] = userFilterData.mobile;
  //   }

  //   return await this.userModel.find(searchParams);
  // }

  async finduserByArray(array: any) {
    return await this.userModel.find({ userID: { $in: array } });
  }

  //   async filterUser(userFilterData: IUserFilterDataDto) {
  //     const condition = { $regex: new RegExp(userFilterData.text, 'i') };
  //     return await this.userModel.find({
  //       $or: [
  //         { firstname: condition },
  //         { lastname: condition },
  //         { idCard: condition },
  //         { mobile: condition },
  //       ],
  //     });
  //   }

  async searchUserByIdCard(idCard: string) {
    return await this.userModel.find({ idCard: idCard });
  }
}
