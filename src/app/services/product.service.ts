import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Helpers } from '../shared/helpers/helpers';
import { ResponseData } from '../models/response';
import { BaseService } from './base.service';

@Injectable()
export class ProductService extends BaseService {
  endpoint = environment.endpoint + '/product';

  getListProduct(params): Observable<ResponseData> {
    params = Helpers.prototype.optimize_params(params);
    return this.http.get<ResponseData>(this.endpoint + '/get', {
      params,
      headers: this.requestHeaders,
    });
  }

  getDetailProduct(params): Observable<ResponseData> {
    params = Helpers.prototype.optimize_params(params);
    return this.http.get<ResponseData>(`${this.endpoint}/get_detail`, {params, headers: this.requestHeaders});
  }

  getDataDemo(): any {
    return {
      category: '5629674762023824595',
      detail_information: [
        {
          key: 'Th\u01b0\u01a1ng Hi\u1ec7u',
          value: 'TOSIBA',
        },
        {
          key: 'Xu\u1ea5t x\u1ee9',
          value: 'Vi\u1ec7t Nam',
        },
        {
          key: 'C\u00f4ng su\u1ea5t',
          value: '33W',
        },
        {
          key: 'Ch\u1ea5t li\u1ec7u',
          value: 'Kim Lo\u1ea1i',
        },
      ],
      name: 'M\u00e1y H\u00daT B\u1ee4I TO SI BA',
      products: [
        {
          color: '',
          default: 1,
          image:
            'http://static.muahoantien.com/uploads/category/5629696086391925327-low-300.png',
          price: 5000000,
          size: 'nh\u1ecf',
          uid: '5630315217746305673',
        },
        {
          color: '',
          default: 0,
          image:
            'http://static.muahoantien.com/uploads/category/5629696192979837211-low-300.png',
          price: 600000,
          size: 'To',
          uid: '5630315217787679364',
        },
      ],
    };
  }
  //
  // getStatisticAgency(params): Observable<ResponseData> {
  //   params = Helpers.prototype.optimize_params(params);
  //   return this.http.get<ResponseData>(this.endpoint + '/get_statistic', {params});
  // }
}
