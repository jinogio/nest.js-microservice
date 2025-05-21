// import { HttpException, HttpStatus } from '@nestjs/common';
// import { UnauthorizedException } from '@nestjs/common/exceptions';

// import {
//   UserPasswordIncorrectError,
//   UserAlreadyExistError,
//   NotFoundUsersListError,
//   UserOldAndNewPasswordSameError,
//   UserNotFoundError,
//   UserIsDeletedError,
//   UserIsAlreadyPausedError,
//   UserIsAlreadyRestoredError,
//   UserPermissionError,
//   DontDeleteOtherUserError,
//   NotFoundCompanysDeletedUsersListError,
// } from '../custome-errors/user.custome.errors';

// export function userErrorHandler(error) {
//   if (error instanceof UserAlreadyExistError) {
//     throw new HttpException(error.message, HttpStatus.CONFLICT);
//   } else if (error instanceof NotFoundUsersListError) {
//     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
//   } else if (error instanceof UserNotFoundError) {
//     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
//   } else if (error instanceof UserIsDeletedError) {
//     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
//   } else if (error instanceof NotFoundCompanysDeletedUsersListError) {
//     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
//   } else if (error instanceof UserIsAlreadyPausedError) {
//     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
//   } else if (error instanceof UserIsAlreadyRestoredError) {
//     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
//   } else if (error instanceof UserPermissionError) {
//     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//   } else if (error instanceof DontDeleteOtherUserError) {
//     throw new HttpException(error.message, HttpStatus.METHOD_NOT_ALLOWED);
//   } else if (error instanceof UserOldAndNewPasswordSameError) {
//     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//   } else if (error instanceof UserPasswordIncorrectError) {
//     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//   } else if (error instanceof UnauthorizedException) {
//     throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
//   }
// }

//!

import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

import {
  UserAlreadyExistError,
  NotFoundUsersListError,
  UserNotFoundError,
  UserOldAndNewPasswordSameError,
  UserIsDeletedError,
  UserIsAlreadyPausedError,
  UserIsAlreadyRestoredError,
  UserPermissionError,
  DontDeleteOtherUserError,
  NotFoundCompanysDeletedUsersListError,
} from './user.custome.errors';

export function userErrorHandler(error: any) {
  if (error instanceof UserAlreadyExistError) {
    throw new HttpException(error.message, HttpStatus.CONFLICT);
  } else if (error instanceof NotFoundUsersListError) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof UserOldAndNewPasswordSameError) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  } else if (error instanceof UserNotFoundError) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof UserIsDeletedError) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof NotFoundCompanysDeletedUsersListError) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof UserIsAlreadyPausedError) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof UserIsAlreadyRestoredError) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof UserPermissionError) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  } else if (error instanceof DontDeleteOtherUserError) {
    throw new HttpException(error.message, HttpStatus.METHOD_NOT_ALLOWED);
  } else if (error instanceof UnauthorizedException) {
    throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
  } else {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}
