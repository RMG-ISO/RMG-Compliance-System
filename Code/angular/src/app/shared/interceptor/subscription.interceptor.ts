import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class SubscriptionInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(err => {
        if (err  instanceof HttpResponse) 
        {
          console.log(err.status);
         if (err.status == 205)
          this.router.navigateByUrl('/subscription');
        }
      })
    );
  }
}
