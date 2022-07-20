import { Component, OnInit } from '@angular/core';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
import { IChangeRequests } from '../../models/createUserInterface';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  displayedColumns: string[] = ['from','reason','change','replacement'];
  dataSource!: MatTableDataSource<IChangeRequests[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) {}

  getRequests() {
    this.adminService.getChangeRequest().subscribe((response) => {
      console.log(response.data)
      this.dataSource = new MatTableDataSource<IChangeRequests[]>(
        Object(response).data
      );
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;

    });
  }

  navBarData: INavBarDetails = {
    name: window.localStorage.getItem('name') || '',
    designation: window.localStorage.getItem('role') || '',
    menuItems: [
      { title: 'Doctor', matIconType: 'person', path: 'admin' },
      { title: 'Nurse', matIconType: 'group', path: 'admin/nurse' },
      { title: 'Requests', matIconType: ' list_alt', path: 'admin/requests' },
      {
        title: 'Notifications',
        matIconType: 'notifications_active',
        path: 'admin/notifications',
      },
    ],
  };

  ngOnInit(): void {
    this.getRequests();
  }
  createDoctor() {}
  deleteDoctor() {}
  updateDoctor() {}
}
