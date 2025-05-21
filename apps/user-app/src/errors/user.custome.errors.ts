import { HttpException, HttpStatus } from '@nestjs/common';
import { User_Error_Message } from './user.error.message';

export class UserAlreadyExistError extends Error {
  constructor() {
    super(User_Error_Message.USER_EXSIST_ERROR);
  }
}

export class NotFoundUsersListError extends Error {
  constructor() {
    super(User_Error_Message.NOT_FOUND_USERS_LIST_ERROR);
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super(User_Error_Message.USER_NOT_FOUND_ERROR);
  }
}

export class UserIsDeletedError extends Error {
  constructor() {
    super(User_Error_Message.USER_ALREADY_DELETED_ERROR);
  }
}

export class UserIsAlreadyPausedError extends Error {
  constructor() {
    super(User_Error_Message.USER_PAUSED_ERROR);
  }
}

export class UserIsAlreadyRestoredError extends Error {
  constructor() {
    super(User_Error_Message.USER_ALREADY_RESTORED_ERROR);
  }
}

export class UserPermissionError extends Error {
  constructor() {
    super(User_Error_Message.USER_ALREADY_RESTORED_ERROR);
  }
}

export class DontDeleteOtherUserError extends Error {
  constructor() {
    super(User_Error_Message.DONT_DELETE_OTHER_USER_ERROR);
  }
}

export class UserPasswordIncorrectError extends Error {
  constructor() {
    super(User_Error_Message.USER_PASSWORD_INCORRECT_ERROR);
  }
}

export class UserOldAndNewPasswordSameError extends Error {
  constructor() {
    super(User_Error_Message.USER_OLD_AND_NEW_PASSWORD_ERROR);
  }
}

export class NotFoundCompanysDeletedUsersListError extends Error {
  constructor() {
    super(User_Error_Message.DONT_HAVE_DELETED_USERS_LIST);
  }
}

export class UserWrongRoleError extends Error {
  constructor() {
    super(User_Error_Message.USER_WRONG_ROLE);
  }
}

// export class UserDontHavePermissionsError extends Error {
//   constructor() {
//     super(User_Error_Message.USER_PERMISSION_ERROR);
//   }
// }
