import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { Helpers } from '../shared/helpers/helpers';
import { ResponseData } from '../models/response';
import { BaseService } from './base.service';


@Injectable()

export class ProductService extends BaseService {
  endpoint = environment.endpoint + '/product';

  getListProduct(params): Observable<ResponseData> {
    params = Helpers.prototype.optimize_params(params);
    return this.http.get<ResponseData>(this.endpoint + '/get', {params, headers: this.requestHeaders});
  }

  getDetailProduct(params): Observable<ResponseData> {
    params = Helpers.prototype.optimize_params(params);
    return this.http.get<ResponseData>(`${this.endpoint}/get_detail`, {params, headers: this.requestHeaders});
  }
  //
  // getStatisticAgency(params): Observable<ResponseData> {
  //   params = Helpers.prototype.optimize_params(params);
  //   return this.http.get<ResponseData>(this.endpoint + '/get_statistic', {params});
  // }

}
