import { Component, OnInit } from '@angular/core';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
import { environment } from 'src/environments/environment';
import { AlertDialogComponent } from 'src/app/modules/shared/components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InputDialogComponent } from 'src/app/modules/shared/components/input-dialog/input-dialog.component';
import { Validators } from '@angular/forms';
import { ICreateUserData, IUpdateUserData } from '../../models/createUserInterface';
import { IInputDialogInput } from 'src/app/modules/shared/models/inputDialogInterface';
import { IOptionsFormat } from 'src/app/modules/shared/models/customInputInterface';
@Component({
  selector: 'app-manage-doctors',
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.scss'],
})
export class ManageDoctorsComponent implements OnInit {
  displayedColumns: string[] = [
    'doctor-name',
    'speciality',
    'nurses',
    'operations',
  ];
  dataSource!: MatTableDataSource<IUserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  nursesList: IOptionsFormat[] = [];

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  getDoctors() {
    this.adminService.getUsers().subscribe((response) => {
      this.dataSource = new MatTableDataSource<IUserData>(
        Object(response).data.filter(
          (user: IUserData) =>
            user.role ===
            environment.roles.find((role) => role.title === 'Doctor')?.roleId
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
    this.getDoctors();
  }

  createDoctor(userData: ICreateUserData) {
    this.adminService.createUser(userData).subscribe((response) => {
      if (response) {
        this.getDoctors();
      }
    });
  }

  onCreateDoctor() {
    this.dialogContentData.dialogTitle = 'Create Doctor';
    this.dialogContentData.buttonType = 'Create';
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '300px',
      data: this.dialogContentData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result['role'] = environment.roles.find(
          (role) => role.title === 'Doctor'
        )?.roleId;
        this.createDoctor(result);
      }
    });
  }
  deleteDoctor(id: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
      data: { dialogTitle: 'Delete Doctor', dialogContent: 'Are you sure ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.deleteUser(id).subscribe((response) => {
          this.getDoctors();
        });
      }
    });
  }

  getNursesWithAssigned(assigned?: boolean) {
    this.nursesList = [];
    this.adminService.getNurses().subscribe((response) => {
      for (let nurse of response.data) {
        if (!assigned) {
          if (nurse.assignedDoctor.length === 0) {
            this.nursesList.push({
              _id: nurse['_id'],
              name: nurse['name'],
            });
          }
        } else {
          this.nursesList.push({
            _id: nurse['_id'],
            name: nurse['name'],
          });
        }
      }
    });
    return this.nursesList;
  }


  updateUser( id : string, userUpdatedData:IUpdateUserData){
    this.adminService.updateUser(id,userUpdatedData).subscribe(response =>{
      if(response){
        this.getDoctors();
      }
    })
  }
  onUpdateDoctor(userData: IUserData) {

    this.dialogContentData.dialogTitle = 'Update Doctor';
    this.dialogContentData.buttonType = 'Update';
    this.dialogContentData.alertInputAttributes[0]['initialValue'] =
      userData.name;
    this.dialogContentData.alertInputAttributes[1]['initialValue'] =
      userData.speciality;
    this.dialogContentData.alertInputAttributes[2]['initialValue'] =
      userData.email;
    this.dialogContentData.alertInputAttributes[3]['options'] =
      this.getNursesWithAssigned(true);
    this.dialogContentData.alertInputAttributes[3]['initialValue'] =
      userData.nurses?.map((nurse) => {
        return { _id: nurse['_id'], name: nurse['name'] };
      });
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '300px',
      data: this.dialogContentData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateUser( userData._id, result);
      }
    });
  }

  
}
