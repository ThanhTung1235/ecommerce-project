import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, Subject, asapScheduler, pipe, of, from,
  interval, merge, fromEvent } from 'rxjs';
import { AppUtils } from 'src/app/utils/app.utils';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private route: ActivatedRoute) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      map(
        (x) => {
          const response = { ...x['body'] };
          if (response.status === 401) {
                AppUtils.logOut();
                if (this.router.url.includes('/tai-khoan/chinh-sua') || this.router.url.includes('/tai-khoan/dia-chi')) {
                    console.log("navigate dang nhap");
                    this.router.navigate(['/tai-khoan/dang-nhap'])
                }
          }
          return x;
        }
      )
    );
  }
}
