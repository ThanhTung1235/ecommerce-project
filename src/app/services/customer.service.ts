import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { ResponseData } from '../models/response';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {

  customerInfo$: Observable<any>;

  API_HOST = `${environment.auth_endpoint}`;
  login(customer: Customer): Observable<ResponseData>{
    return this.http.post<ResponseData>(`${this.API_HOST}/login_member`, {phone: customer.phone, password: customer.password}, {headers: this.requestHeaders});
  }

  register(customer: Customer): Observable<ResponseData>{
    return this.http.post<ResponseData>(`${this.API_HOST}/register_members`, customer, {headers: this.requestHeaders});
  }

  getInfoCustomer(): Observable<ResponseData>{
    return this.http.get<ResponseData>(`${this.API_HOST}/get_info_member`, {headers: this.requestHeaders});
  }

}
