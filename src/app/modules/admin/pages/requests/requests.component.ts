import { Component, OnInit } from '@angular/core';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
import { IChangeRequests } from '../../models/createUserInterface';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/modules/shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  displayedColumns: string[] = [
    'from',
    'reason',
    'change',
    'replacement',
    'time',
    'status',
    'operations',
  ];
  dataSource!: MatTableDataSource<IChangeRequests[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService,public dialog: MatDialog) {}

  getRequests() {
    this.adminService.getChangeRequest().subscribe((response) => {
      console.log(response.data);
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
    console.log();

  }
  updateResponse(id: string, change: any): void {
    console.log(change)
    this.adminService.updateRequest(id, change).subscribe((response) => {
      if (response) {
        this.getRequests();
      }
    });
  }

  onAcceptRequest(id: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
      data: { dialogTitle: 'Accept  Request', dialogContent: 'Are you sure ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateResponse(id,{
          status : environment.RequestStatus.APPROVED
        })
      }
    });
  }
  onRejectRequest(id: string) {

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
      data: { dialogTitle: 'Reject  Request', dialogContent: 'Are you sure ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateResponse(id,{
          status : environment.RequestStatus.REJECTED
        })
      }
    });
  }
}
