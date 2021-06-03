import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor} from './httpErrorInterceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];
