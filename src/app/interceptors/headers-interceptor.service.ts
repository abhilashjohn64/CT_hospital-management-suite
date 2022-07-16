import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../modules/shared/services/token.service';

@Injectable()
export class HeadersInterceptorService implements  HttpInterceptor {
  private authToken:string = "";
  constructor(
    private tokenService : TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    this.getToken();
    req = req.clone({ headers: req.headers.append('Content-Type', 'application/json')});
    let tokenizedRequest = req.clone({
      headers:req.headers.append('Authorization',`${this.authToken}`)
    })
    return next.handle(tokenizedRequest)
  }
  private getToken(){
    let token = localStorage.getItem('token');
    if(token){
    this.authToken = token;
    }
  }
}


