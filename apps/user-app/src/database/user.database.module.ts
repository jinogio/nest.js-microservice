import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EncryptPassword } from 'common/util/encrypt.password';
import { UserSchema, User } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserRepository, EncryptPassword],
  exports: [UserRepository, EncryptPassword],
})
export class UserDatabaseModule {}
