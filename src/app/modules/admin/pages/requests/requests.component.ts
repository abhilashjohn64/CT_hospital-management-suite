import { Component, OnInit } from '@angular/core';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
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
  constructor() {}

  ngOnInit(): void {}
}
