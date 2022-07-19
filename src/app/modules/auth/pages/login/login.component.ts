import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRole, IUserLoginCredentials } from '../../model/userLoginInterface';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  loginForm = new FormGroup({
    email : new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required,Validators.minLength(4)])
  })
  ngOnInit(): void {
  }
  private login(userLoginData : IUserLoginCredentials){
    this.authService.logUser(userLoginData).subscribe(response=>{
      console.log(response)
      if(response.statusCode =="200" && response.data.token){
        window.localStorage.setItem("token",response.data.token)
        window.localStorage.setItem("name",response.data.name)
        const userRole = environment.roles.find(role=>role.roleId ===response.data.role)
        if(userRole){
          window.localStorage.setItem("roleId", userRole.roleId)
          window.localStorage.setItem("role", userRole.title)
          this.router.navigate([userRole.url])
        }
      }
    });

  }
  onLogin(form : FormGroup){
    if(form.valid){
      this.login(form.value)
    }
  }

}
