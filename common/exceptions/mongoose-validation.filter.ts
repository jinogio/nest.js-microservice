import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { MongoServerError } from 'mongodb'; // გამოიყენე mongodb package
import { Response } from 'express';

@Catch(MongoServerError)
export class MongoDuplicateKeyFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    console.log('exce', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('res', response);

    if (exception.code === 11000) {
      const duplicatedField = Object.keys(exception.keyPattern)[0];
      const duplicatedValue = exception.keyValue[duplicatedField];

      return response.status(400).json({
        statusCode: 400,
        message: `${duplicatedField} უნდა იყოს უნიკალური.`,
        errors: [
          {
            field: duplicatedField,
            value: duplicatedValue,
            message: `${duplicatedField} მნიშვნელობა '${duplicatedValue}' უკვე გამოყენებულია.`,
          },
        ],
      });
    }

    // სხვა Mongo error
    response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
