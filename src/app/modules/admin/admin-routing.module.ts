import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageDoctorsComponent } from './pages/manage-doctors/manage-doctors.component';
import { ManageNursesComponent } from './pages/manage-nurses/manage-nurses.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { RequestsComponent } from './pages/requests/requests.component';
const routes: Routes = [{ path: '', component: ManageDoctorsComponent },
{ path: 'nurse', component: ManageNursesComponent },
{ path: 'requests', component: RequestsComponent },
{ path: 'notifications', component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
