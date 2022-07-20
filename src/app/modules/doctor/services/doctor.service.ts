import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRequests } from '../models/doctorInterface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private httpClient : HttpClient) { }

  get(endPoint:string, queryParams?: HttpParams){
    return this.httpClient.get(`${environment.baseUrl}${endPoint}`,{params:queryParams})
  }

  post(endPoint:string,data : IRequests){
    return this.httpClient.post(`${environment.baseUrl}${endPoint}`,data)
  }


  getDoctorDetails() : Observable<any>{
    return this.get("user/profile")
  }

  getChangeRequest(): Observable<any>{
    return this.get("change-request")
  }
  postChangeRequest(data: IRequests): Observable<any>{
    return this.post("change-request",data)
  }

  getMessages(): Observable<any>{
    return this.get("message")
  }

  getNurses() : Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('role', environment.roles.find(role=>role.title==="Nurse")?.roleId || "" );
    queryParams = queryParams.append('occupied', false );
    return this.get("user",queryParams)
  }
}
