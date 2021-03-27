import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Helpers} from '../shared/helpers/helpers';


interface ResponseData {
  status_code: number;
  message?: string;
  data: any;
}

@Injectable()

export class CategoryService {
  endpoint = environment.endpoint + '/category';

  constructor(private http: HttpClient) {
  }

  getListCategory(params): Observable<ResponseData> {
    params = Helpers.prototype.optimize_params(params);
    return this.http.get<ResponseData>(this.endpoint + '/get', {params});
  }
  //
  // getStatisticAgency(params): Observable<ResponseData> {
  //   params = Helpers.prototype.optimize_params(params);
  //   return this.http.get<ResponseData>(this.endpoint + '/get_statistic', {params});
  // }

}
