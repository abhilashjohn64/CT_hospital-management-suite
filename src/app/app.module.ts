import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { httpInterceptorProviders } from './interceptors/httpInterceptorProvider';
import { NgToastModule } from 'ng-angular-popup'
import { HttpClientModule } from '@angular/common/http';
import { GuardService } from './modules/shared/services/guard.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgToastModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
