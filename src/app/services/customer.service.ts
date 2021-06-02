import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { ResponseData } from '../models/response';
import { Customer } from '../models/customer';
import { shareReplay } from 'rxjs/operators';


const CACHE_SIZE = 1
@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {
  customer_info$: Observable<ResponseData>;

  API_HOST = `${environment.auth_endpoint}`;
  login(customer: Customer): Observable<ResponseData>{
    return this.http.post<ResponseData>(`${this.API_HOST}/login_member`, {phone: customer.phone, password: customer.password}, {headers: this.requestHeaders});
  }

  register(customer: Customer): Observable<ResponseData>{
    return this.http.post<ResponseData>(`${this.API_HOST}/register_members`, customer, {headers: this.requestHeaders});
  }

  getInfoCustomer(): Observable<ResponseData>{
    return this.http.post<ResponseData>(`${this.API_HOST}/get_info_member`,{}, {headers: this.requestHeaders});
  }

  getcustomerInfoCache() {
    if (!this.customer_info$) {
      this.customer_info$ = this.getInfoCustomer().pipe(shareReplay(CACHE_SIZE));
    }
    return this.customer_info$;
  }

}
