import { Component, OnInit } from '@angular/core';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  displayedColumns: string[] = ['doctor-name', 'nurses', 'operations'];
  dataSource!: MatTableDataSource<IUserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) {}

  getDoctors() {
    this.adminService.getUsers().subscribe((response) => {
      this.dataSource = new MatTableDataSource<IUserData>(
        Object(response).data.filter(
          (user: IUserData) => user.role === '62cd75655853a5d2c643dbab'
        )
      );
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
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
    this.getDoctors();
  }
  createDoctor() {}
  deleteDoctor() {}
  updateDoctor() {}
}
