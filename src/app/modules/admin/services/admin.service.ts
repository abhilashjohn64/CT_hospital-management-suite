import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService  {
  constructor(private httpClient : HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Authorization' : this.getToken() || "",
    }),
  };


  get(endPoint:string){
    return this.httpClient.get(`${environment.baseUrl}${endPoint}`)
  }

  getUsers() :Observable<any>{
    return this.get('user')
  }

  getToken(){
    return window.localStorage.getItem("token")
  }
}
