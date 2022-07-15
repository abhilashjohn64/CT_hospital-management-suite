import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserLoginCredentials } from '../model/userLoginInterface';
import { Observable } from 'rxjs';
import { LoginComponent } from '../pages/login/login.component';

@Injectable()

export class AuthService {

  constructor( private httpClient : HttpClient) { }
  logUser(userLoginData : IUserLoginCredentials) :Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}user/login`,userLoginData);
  }

}
