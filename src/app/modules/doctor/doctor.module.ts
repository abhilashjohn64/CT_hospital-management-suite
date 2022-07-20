import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ViewRequestComponent } from './pages/view-request/view-request.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DoctorComponent,
    HomePageComponent,
    ViewRequestComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class DoctorModule { }
