import { Component, OnInit } from '@angular/core';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
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
