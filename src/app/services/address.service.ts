import {environment} from './../../environments/environment';
import {BaseService} from 'src/app/services/base.service';
import {Injectable} from '@angular/core';
import {ResponseData} from '../models/response';
import {Observable} from 'rxjs';
import {CustomerAddress} from '../models/address';
import {shareReplay} from 'rxjs/operators';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService {

  API_HOST_ADDRESS = `${environment.endpoint_address}/address`;
  API_HOST_ADDRESS_MEMBER = `${environment.endpoint}/address_member`;

  city$: Observable<ResponseData>;
  district$: Observable<ResponseData>;
  ward$: Observable<ResponseData>;

  getCity(): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS}/get?type=1`, {headers: this.requestHeaders});
  }

  getDistrict(district_code): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS}/get?type=2&code=${district_code}`, {headers: this.requestHeaders});
  }

  getWard(ward_code): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS}/get?type=3&code=${ward_code}`, {headers: this.requestHeaders});
  }

  getCityCache(): Observable<ResponseData> {
    if (!this.city$) {
      this.city$ = this.getCity().pipe(shareReplay(CACHE_SIZE));
    }
    return this.city$;
  }

  getDistrictCache(district_code): Observable<ResponseData> {
    if (!this.district$) {
      this.district$ = this.getDistrict(district_code).pipe(shareReplay(CACHE_SIZE));
    }
    return this.district$;
  }

  getWardCache(ward_code): Observable<ResponseData> {
    if (!this.ward$) {
      this.ward$ = this.getWard(ward_code).pipe(shareReplay(CACHE_SIZE));
    }
    return this.ward$;
  }

  createUserAddress(customer_address: CustomerAddress): Observable<ResponseData> {
    return this.http.post<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/create_address_member`, customer_address, {headers: this.requestHeaders});
  }

  updateUserAddress(customer_address: CustomerAddress): Observable<ResponseData> {
    return this.http.post<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/update_address_member`, customer_address, {headers: this.requestHeaders});
  }

  userAddressDefault(uid_address): Observable<ResponseData> {
    return this.http.post<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/update_address_member_default`, {uid: uid_address}, {headers: this.requestHeaders});
  }

  getUserAddress(limit, page): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/get_list_address?limit=${limit}&page=${page}`, {headers: this.requestHeaders});
  }

  getUserAddressDetail(uid_address): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/get_detail_address?uid=${uid_address}`, {headers: this.requestHeaders});
  }

  update_address_member_default(uid): Observable<ResponseData> {
    return this.http.post<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/update_address_member_default`, {uid: uid}, {headers: this.requestHeaders});
  }

  deleteAddress(uid): Observable<ResponseData> {
    return this.http.post<ResponseData>(`${this.API_HOST_ADDRESS_MEMBER}/delete`, {uid: uid}, {headers: this.requestHeaders});
  }
}
