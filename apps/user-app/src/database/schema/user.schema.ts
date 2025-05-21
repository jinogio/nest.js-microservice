import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { ROLE } from 'common/enums/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
import * as uniqueValidator from 'mongoose-unique-validator';

@Schema({ timestamps: true, autoIndex: true, toJSON: { virtuals: true } })
export class User extends Document {
  @Prop({ index: true })
  // @Expose({ groups: [Role.Admin], toPlainOnly: true })
  // @Exclude({ toPlainOnly: true })
  // _id: string;
  userID: string;

  @Prop({ index: true, default: null })
  telegramID: number;

  @Prop({ default: null })
  firstName: string;

  @Prop({ default: null })
  lastName: string;

  @Prop({ default: null, unique: true })
  @Expose({ groups: [ROLE.ADMIN], toPlainOnly: true })
  idCard: string;

  // @Prop({})
  // photo: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ default: null, unique: true })
  mobile: string;

  @Prop({ default: null })
  address: string;

  @Prop()
  @Exclude({ toPlainOnly: true })
  password?: string;

  // @Prop()
  // refreshToken: string;

  @Prop()
  @Expose()
  gender: string;

  @Prop({ default: Date.now })
  @Expose()
  birthday: Date;

  @Prop({
    default: ROLE.USER,
    enum: [ROLE.USER, ROLE.ADMIN],
  })
  @Expose()
  role: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('age').get(function (this: { birthday: string }) {
  const today = new Date();

  const birthDate = new Date(this.birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
});
UserSchema.plugin(softDeletePlugin);

UserSchema.plugin(uniqueValidator, {
  message: '{PATH} Aleady Exsist. Value {VALUE} Already Exsist',
});

// const userDocument = await User.findById(userId);
// const userObject = userDocument.toObject({ transform: true });
