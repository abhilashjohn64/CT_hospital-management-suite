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
import {}
@Component({
  selector: 'app-manage-nurses',
  templateUrl: './manage-nurses.component.html',
  styleUrls: ['./manage-nurses.component.scss'],
})
export class ManageNursesComponent implements OnInit {
  doctorsList : IOptionsFormat[] = []
  displayedColumns: string[] = ['nurse-name', 'doctor', 'operations'];
  dataSource!: MatTableDataSource<IUserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService,  public dialog: MatDialog) {}

  getNurse() {
    this.adminService.getUsers().subscribe((response) => {
      this.dataSource = new MatTableDataSource<IUserData>(
        Object(response).data.filter(
          (user: IUserData) => user.role === environment.roles.find(role=>role.title === "Nurse")?.roleId
        )
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  // getDoctor(){
  //   this.adminService.getNurses().subscribe(response =>{
  //     response.data.map(doctor =>{
  //       console.log(doctor)
  //     })
  //   })
  // }

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
  getDoctor(){

  }
  createNurse() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
      data: { dialogTitle: 'Delete Doctor', dialogContent: 'Are you sure ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
    });
  }
  deleteNurse(id:string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
      data: { dialogTitle: 'Delete Nurse', dialogContent: 'Are you sure ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.deleteUser(id).subscribe(response=>{
          this.getNurse();
        });
      }
    });
  }

  updateNurse() {}


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
        // options: this.getNursesWithAssigned(false),
        isMultiSelect: true,
      },
    ],
  };
}
