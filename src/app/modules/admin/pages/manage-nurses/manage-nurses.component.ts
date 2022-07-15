import { Component, OnInit } from '@angular/core';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';

@Component({
  selector: 'app-manage-nurses',
  templateUrl: './manage-nurses.component.html',
  styleUrls: ['./manage-nurses.component.scss'],
})
export class ManageNursesComponent implements OnInit {
  constructor() {}
  navBarData: INavBarDetails = {
    name: window.localStorage.getItem('name') || '',
    designation: window.localStorage.getItem('role') || '',
    menuItems: [
      { title: 'Doctor', matIconType: 'local_hospital', path: 'admin' },
      { title: 'Nurse', matIconType: 'local_hospital', path: 'admin/nurse' },
      {
        title: 'Requests',
        matIconType: 'local_hospital',
        path: 'admin/requests',
      },
      {
        title: 'Notifications',
        matIconType: 'local_hospital',
        path: 'admin/notifications',
      },
    ],
  };
  ngOnInit(): void {}
}
