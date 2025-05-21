import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const createUserDecorator = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();

    const request = context.getRequest<Request>();
    // console.log('chemi data', request.body[data]);
    // console.log('chemi dekoratori', request.body);
    // console.log('decorator data', data);
    // return request.body ? request.body?.[data] : request.body;
    // return request.body ? request.body['data'] : request.body;
    return request.body;
  },
);
