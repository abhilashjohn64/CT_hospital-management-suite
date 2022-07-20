import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseComponent } from './nurse.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SendMessageComponent } from './pages/send-message/send-message.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    NurseComponent,
    HomePageComponent,
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class NurseModule { }
