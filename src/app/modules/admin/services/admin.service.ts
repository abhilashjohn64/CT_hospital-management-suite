import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateUserData, IUpdateUserData} from '../models/createUserInterface';

@Injectable({
  providedIn: 'root'
})
export class AdminService  {
  constructor(private httpClient : HttpClient) { }

  get(endPoint:string, queryParams?: HttpParams){
    return this.httpClient.get(`${environment.baseUrl}${endPoint}`,{params:queryParams})
  }
  delete(endPoint:string,id:string){
    return this.httpClient.delete(`${environment.baseUrl}${endPoint}/${id}`)
  }
  post(endPoint:string,data : ICreateUserData){
    return this.httpClient.post(`${environment.baseUrl}${endPoint}`,data)
  }
  patch(endPoint : string, data: IUpdateUserData){
    return this.httpClient.patch(`${environment.baseUrl}${endPoint}`,data)
  }

  getUsers() :Observable<any>{
    return this.get('user')
  }
  deleteUser(id:string) :Observable<any>{
    return this.delete("user",id)
  }
  createUser(data : ICreateUserData): Observable<any>{
    return this.post("user/register",data)
  }
  getNurses() : Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('role', environment.roles.find(role=>role.title==="Nurse")?.roleId || "" );
    queryParams = queryParams.append('occupied', false );
    return this.get("user",queryParams)
  }
  getToken(){
    return window.localStorage.getItem("token")
  }

  updateUser(id:string,  userData : IUpdateUserData) : Observable<any>{
    return this.patch(`user/${id}`,userData)
  }

}
