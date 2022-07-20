import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InputDialogComponent } from 'src/app/modules/shared/components/input-dialog/input-dialog.component';
import { IOptionsFormat } from 'src/app/modules/shared/models/customInputInterface';
import { IInputDialogInput } from 'src/app/modules/shared/models/inputDialogInterface';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
import { IChangeRequests, IRequests } from '../../models/doctorInterface';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  displayedColumns: string[] = ['nurse-name', 'email', 'operations'];
  unAssignedNurses: IOptionsFormat[] = [];
  dataSource!: MatTableDataSource<IUserData[]>;
  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog
  ) {}
  doctorDetails: IUserData = {
    _id: '',
    name: '',
    email: '',
    role: '',
  };

  ngOnInit(): void {
    this.getDoctorDetails();
    this.getUnAssignedNurses();
  }
  
  getDoctorDetails() {
    this.doctorService.getDoctorDetails().subscribe((response) => {
      this.doctorDetails = response.data;

      this.dataSource = new MatTableDataSource<IUserData[]>(
        response.data.nurses
      );
    });
  }

  getUnAssignedNurses() {
    this.doctorService.getNurses().subscribe((response) => {
      for (let nurses of response.data) {
        this.unAssignedNurses.push({ _id: nurses._id, name: nurses.name });
      }
    });
  }

  submitChangeRequest(request : IRequests){
    this.doctorService.postChangeRequest(request).subscribe(response =>{
      console.log(response);
    })
  }

  onChangeRequest(user: IUserData) {
    this.dialogContentData.dialogTitle = `Change ${user.name}  Request`;
    this.dialogContentData.buttonType = 'Submit';
    console.log(this.dialogContentData);
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '300px',
      data: this.dialogContentData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.submitChangeRequest({
          ...result,
          for : user._id
        })
      }
    });
  }

  navBarData: INavBarDetails = {
    name: window.localStorage.getItem('name') || '',
    designation: window.localStorage.getItem('role') || '',
    menuItems: [
      { title: 'Home', matIconType: 'home', path: 'doctor' },
      { title: 'View Request', matIconType: 'list', path: 'doctor/requests' },
      { title: 'Messages', matIconType: ' message', path: 'doctor/messages' },
    ],
  };

  dialogContentData: IInputDialogInput = {
    dialogTitle: '',
    buttonType: '',
    alertInputAttributes: [
      {
        type: 'text',
        label: 'reason',
        validation: [Validators.required, Validators.minLength(2)],
      },
      {
        type: 'select',
        label: 'replacement',
        options: this.unAssignedNurses,
        isMultiSelect: false,
      },
    ],
  };
}
