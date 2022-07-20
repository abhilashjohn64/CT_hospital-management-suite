import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ViewRequestComponent } from './pages/view-request/view-request.component';

const routes: Routes = [{ path: '', component: HomePageComponent },
{ path: 'requests', component: ViewRequestComponent },
{ path: 'messages', component: MessagesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
