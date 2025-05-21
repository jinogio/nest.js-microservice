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

export class OrderDataDto {
  // @Matches(/^[a-zA-Z]+$/, {
  //   message: 'სახელი უნდა სჰეიცავლდეს მხოლოდ ანბანის ასოებს',
  // })
  @IsNotEmpty()
  @IsString()
  userID: string;

  // @Matches(/^[\u10D0-\u10FF]+$/, {
  //   message: 'lastname must contain only Georgian letters',
  // })
  @IsString()
  @IsNotEmpty()
  name: string;
}
