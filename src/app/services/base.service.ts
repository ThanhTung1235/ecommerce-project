import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

constructor(public http: HttpClient) { }

get requestHeaders(): any {
  return this.createAPIHeader();
}

private createAPIHeader(): any {
  return new HttpHeaders({
    'Content-Type': 'application/json'
  });
}



}
