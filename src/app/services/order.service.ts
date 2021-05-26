import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ResponseData } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{
  API_HOST = `${environment.endpoint}/ord`;
  createOrder(order): Observable<ResponseData>{
    return this.http.post<ResponseData>(`${this.API_HOST}/create`, order, {headers: this.requestHeaders});
  }
}
