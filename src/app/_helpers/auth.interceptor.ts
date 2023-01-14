import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const session: any = localStorage.getItem('currentUser');
    const data = JSON.parse(session);

    if (data !== null) {

      req = req.clone({
        setHeaders: {
          Authorization: data?.token,
        },
      });

    }
    return next.handle(req);
  }
}
