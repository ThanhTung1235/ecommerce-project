import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Helpers } from '../shared/helpers/helpers';
import { BaseService } from './base.service';
import { ResponseData } from '../models/response';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService extends BaseService {
  endpoint = environment.endpoint + '/category';

  getListCategory(params): Observable<ResponseData> {
    params = Helpers.prototype.optimize_params(params);
    return this.http.get<ResponseData>(this.endpoint + '/get', {params, headers: this.requestHeaders});
  }
  //
  // getStatisticAgency(params): Observable<ResponseData> {
  //   params = Helpers.prototype.optimize_params(params);
  //   return this.http.get<ResponseData>(this.endpoint + '/get_statistic', {params});
  // }
}
