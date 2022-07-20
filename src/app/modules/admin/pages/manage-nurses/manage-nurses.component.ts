import { Component, OnInit } from '@angular/core';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/modules/shared/components/alert-dialog/alert-dialog.component';
import { IInputDialogInput } from 'src/app/modules/shared/models/inputDialogInterface';
import { Validators } from '@angular/forms';
import { IOptionsFormat } from 'src/app/modules/shared/models/customInputInterface';
import { InputDialogComponent } from 'src/app/modules/shared/components/input-dialog/input-dialog.component';
import {
  ICreateUserData,
  IUpdateUserData,
} from '../../models/createUserInterface';

@Component({
  selector: 'app-manage-nurses',
  templateUrl: './manage-nurses.component.html',
  styleUrls: ['./manage-nurses.component.scss'],
})
export class ManageNursesComponent implements OnInit {
  doctorsList: IOptionsFormat[] = [];
  displayedColumns: string[] = [
    'nurse-name',
    'doctor',
    'time',
    'update-time',
    'operations',
  ];
  dataSource!: MatTableDataSource<IUserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  getNurse() {
    this.adminService.getUsers().subscribe((response) => {
      this.dataSource = new MatTableDataSource<IUserData>(
        Object(response).data.filter(
          (user: IUserData) =>
            user.role ===
            environment.roles.find((role) => role.title === 'Nurse')?.roleId
        )
      );
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
    this.getNurse();
  }
  getDoctor() {
    this.doctorsList = [];
    this.adminService.getUsers().subscribe((response) => {
      for (let user of response.data) {
        console.log(
          user.role ===
            environment.roles.find((role) => role.title === 'Doctor')?.roleId
        );
        if (
          user.role ===
          environment.roles.find((role) => role.title === 'Doctor')?.roleId
        )
          this.doctorsList.push({
            _id: user['_id'],
            name: user['name'],
          });
      }
    });
    return this.doctorsList;
  }

  createNurse(userData: ICreateUserData) {
    this.adminService.createUser(userData).subscribe((response) => {
      if (response) {
        this.getNurse();
      }
    });
  }

  onCreateNurse() {
    this.dialogContentData.dialogTitle = 'Create Nurse';
    this.dialogContentData.buttonType = 'Create';
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '300px',
      data: this.dialogContentData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.assignedDoctor ? result : (result.assignedDoctor = null);
        result['role'] = environment.roles.find(
          (role) => role.title === 'Nurse'
        )?.roleId;
        this.createNurse(result);
      }
    });
  }

  onDeleteNurse(id: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
      data: { dialogTitle: 'Delete Nurse', dialogContent: 'Are you sure ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.deleteUser(id).subscribe((response) => {
          this.getNurse();
        });
      }
    });
  }

  updateUser(id: string, userUpdatedData: IUpdateUserData) {
    this.adminService.updateUser(id, userUpdatedData).subscribe((response) => {
      if (response) {
        this.getNurse();
      }
    });
  }
  onUpdateNurse(userData: IUserData) {
    this.dialogContentData.dialogTitle = 'Update Nurse';
    this.dialogContentData.buttonType = 'Update';
    this.dialogContentData.alertInputAttributes[0]['initialValue'] =
      userData.name;
    this.dialogContentData.alertInputAttributes[1]['initialValue'] =
      userData.email;
    this.dialogContentData.alertInputAttributes[2]['initialValue'] = [];

    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '300px',
      data: this.dialogContentData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.assignedDoctor.length ? result : (result.assignedDoctor = null);
        this.updateUser(userData._id, result);
      }
    });
  }

  dialogContentData: IInputDialogInput = {
    dialogTitle: '',
    buttonType: '',
    alertInputAttributes: [
      {
        type: 'text',
        label: 'name',
        validation: [Validators.required, Validators.minLength(4)],
      },
      {
        type: 'email',
        label: 'email',
        validation: [Validators.required, Validators.email],
      },
      {
        type: 'select',
        label: 'assignedDoctor',
        options: this.getDoctor(),
        isMultiSelect: false,
      },
    ],
  };
}







