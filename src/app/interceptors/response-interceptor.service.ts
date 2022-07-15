import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { map} from 'rxjs/operators';
import { NgToastService } from 'ng-angular-popup';
import { TokenService } from '../modules/shared/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class ResponseInterceptorService implements HttpInterceptor {
  constructor(
    private toast: NgToastService
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((resp) => {
        if (resp instanceof HttpResponse) {
          resp = resp.clone<any>({
            body: { ...resp.body, statusCode: resp.status },
          });
        }
        return resp;
      }),
      catchError((err) => {
        if(err instanceof HttpErrorResponse) {
          console.log(err)
        try{
          this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:true});
          // this.ngToastService.error({detail:err.error.title,summary: err.error.message, duration:5000})
        }
        catch(e){
          this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:true});
          // this.ngToastService.error({detail:"Error",summary: "Unknown Error", duration:5000})
        }
      }
        return of(err);
      }
      ),
    );
  }
}


