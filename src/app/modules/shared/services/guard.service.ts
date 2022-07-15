import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

const roles  = [
  { title: 'Admin', roleId: '62cd75655853a5d2c643dbaa' , url : 'admin'},
  { title: 'Doctor', roleId: '62cd75655853a5d2c643dbab', url: 'doctor' },
  { title: 'Nurse', roleId: '62cd75655853a5d2c643dbac', url:"nurse" },
];


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanLoad {
  constructor(private router: Router) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(window.localStorage.getItem('roleId') === roles.find(role=>role.url === route.path)?.roleId && window.localStorage.getItem("token")){
      return true
    }
    alert('You are not authorized to visit this page. You are redirected to login Page');
    this.router.navigate([""],{ queryParams: { retUrl: route.path} });
    return false;
  }
}
