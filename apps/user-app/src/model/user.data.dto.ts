import { Expose } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  MinLength,
  Matches,
} from 'class-validator';
import { ROLE } from 'common/enums/role.enum';

export class UserDataDto {
  // @Matches(/^[a-zA-Z]+$/, {
  //   message: 'სახელი უნდა სჰეიცავლდეს მხოლოდ ანბანის ასოებს',
  // })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  // @Matches(/^[\u10D0-\u10FF]+$/, {
  //   message: 'lastname must contain only Georgian letters',
  // })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  idCard: string;

  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'პაროლი უნდა შეიცავდეს მინიმუმ 5 სიმბოლოს' })
  password: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  role?: ROLE;
}
