import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    console.log(message);

    response.status(status).json({
      statusCode: status,
      message,

      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus
//       ? exception.getStatus()
//       : HttpStatus.INTERNAL_SERVER_ERROR;
//     const exceptionResponse = exception.getResponse();

//     // Determine if exceptionResponse is an object
//     const message =
//       typeof exceptionResponse === 'object'
//         ? exceptionResponse
//         : { message: exceptionResponse };

//     response.status(status).json({
//       statusCode: status,
//       ...message,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//     });
//   }
// }
