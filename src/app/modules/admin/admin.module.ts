import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ManageDoctorsComponent } from './pages/manage-doctors/manage-doctors.component';
import { SharedModule } from '../shared/shared.module';
import { ManageNursesComponent } from './pages/manage-nurses/manage-nurses.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [
    AdminComponent,
    ManageDoctorsComponent,
    ManageNursesComponent,
    RequestsComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
