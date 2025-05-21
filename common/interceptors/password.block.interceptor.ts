import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable()
export class PasswordBlockerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data?.toJSON) {
          const responseWithoutMongooseFields = data.toJSON();
          delete responseWithoutMongooseFields.password;

          return responseWithoutMongooseFields;
        }
        return data;
      }),
    );
  }
}
