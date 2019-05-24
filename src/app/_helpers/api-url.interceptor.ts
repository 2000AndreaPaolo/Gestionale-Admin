import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../_shared/injectionTokens';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(API_URL) private apiUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({url: this.prepareUrl(req.url)});

    return next.handle(req);
  }

  private prepareUrl(url: string): string {
    return `${this.apiUrl}${url}`;
  }
}