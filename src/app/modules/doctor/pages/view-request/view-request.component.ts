import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {

  dataSource!: MatTableDataSource<IUserData>;
  constructor() { }

  ngOnInit(): void {
  }


  navBarData: INavBarDetails = {
    name: window.localStorage.getItem('name') || '',
    designation: window.localStorage.getItem('role') || '',
    menuItems: [
      { title: 'Home', matIconType: 'home', path: 'doctor' },
      { title: 'View Request', matIconType: 'list', path: 'doctor/requests' },
      { title: 'Messages', matIconType: ' message', path: 'doctor/messages' }
    ],
  };
}
