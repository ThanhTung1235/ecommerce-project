import { environment } from './../../environments/environment';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { ResponseData } from '../models/response';
import { Observable } from 'rxjs';
import { CustomerAddress } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService{

  API_HOST_ADDRESS = `${environment.endpoint_address}/address`
  API_HOST_ADDRESS_MEMBER =`${environment.endpoint}/address_member`



  getCity(): Observable<ResponseData>{
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS}/get?type=1`, {headers: this.requestHeaders});
  }

  getDistrict(district_code): Observable<ResponseData>{
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS}/get?type=2&code=${district_code}`, {headers: this.requestHeaders});
  }

  getWard(ward_code): Observable<ResponseData>{
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS}/get?type=3&code=${ward_code}`, {headers: this.requestHeaders});
  }

  createUserAddress(customer_address: CustomerAddress): Observable<ResponseData>{
    return this.http.post<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/create_address_member`,customer_address, {headers: this.requestHeaders});
  }

  updateUserAddress(): Observable<ResponseData>{
    return this.http.post<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/update_address_member`,{}, {headers: this.requestHeaders});
  }

  userAddressDefault(uid_address): Observable<ResponseData>{
    return this.http.post<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/update_address_member_default`,{uid : uid_address}, {headers: this.requestHeaders});
  }

  getUserAddress(): Observable<ResponseData>{
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/get_list_address?limit=10&page=1`, {headers: this.requestHeaders});
  }

  getUserAddressDetail(uid_address): Observable<ResponseData>{
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/get_detail_address?uid=${uid_address}`, {headers: this.requestHeaders});
  }
}
