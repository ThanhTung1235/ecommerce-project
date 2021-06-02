import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './HttpErrorInterceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];