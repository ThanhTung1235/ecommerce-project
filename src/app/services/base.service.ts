import { AppUtils } from 'src/app/utils/app.utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private subject = new Subject();

  constructor(public http: HttpClient) {}

  sendData(data: any){
    this.subject.next(data);
  }

  clearData(data: any){
    this.subject.next();
  }

  getData(): Observable<any>{
    return this.subject.asObservable();
  }

  get requestHeaders(): any {
    return this.createAPIHeader();
  }

  private createAPIHeader(): any {
    const token = AppUtils.getDataFromCookies('re_tk')
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
