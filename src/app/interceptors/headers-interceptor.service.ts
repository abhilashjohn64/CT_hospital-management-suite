import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../modules/shared/services/token.service';

@Injectable()
export class HeadersInterceptorService implements  HttpInterceptor {

  constructor(
    private tokenService : TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json')});
    req = req.clone({ headers: req.headers.set('Auth', getToken())});
    console.log(req)
    return next.handle(req)
  }

}
function getToken() :string{
  return window.localStorage.getItem("token") || ""
}

