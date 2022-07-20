import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SendMessageComponent } from './pages/send-message/send-message.component';

const routes: Routes = [{ path: '', component: HomePageComponent },
{ path: 'send-message', component: SendMessageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
