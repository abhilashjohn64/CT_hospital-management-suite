import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRequests } from '../../doctor/models/doctorInterface';
import { IMessageFormat } from '../pages/send-message/send-message.component';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  constructor(private httpClient : HttpClient) { }

  get(endPoint:string, queryParams?: HttpParams){
    return this.httpClient.get(`${environment.baseUrl}${endPoint}`,{params:queryParams})
  }
  post(endPoint:string,data : IMessageFormat | IRequests){
    return this.httpClient.post(`${environment.baseUrl}${endPoint}`,data)
  }

  getNurseDetails() : Observable<any>{
    return this.get("user/profile")
  }

  sendMessage(data : IMessageFormat) : Observable<any>{
    return this.post("message",data)
  }
  postChangeRequest(data: IRequests): Observable<any>{
    return this.post("change-request",data)
  }

  getDoctors() : Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('role', environment.roles.find(role=>role.title==="Doctor")?.roleId || "" );
    return this.get("user",queryParams)
  }

}
