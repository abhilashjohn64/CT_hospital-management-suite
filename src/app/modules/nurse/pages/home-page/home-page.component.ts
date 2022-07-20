import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IRequests } from 'src/app/modules/doctor/models/doctorInterface';
import { InputDialogComponent } from 'src/app/modules/shared/components/input-dialog/input-dialog.component';
import { IOptionsFormat } from 'src/app/modules/shared/models/customInputInterface';
import { IInputDialogInput } from 'src/app/modules/shared/models/inputDialogInterface';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
import { NurseService } from '../../services/nurse.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  doctorsList : IOptionsFormat[] =[]
  nurseDetails : IUserData ={
    _id: '',
    name: '',
    email: '',
    role: ''
  }
  constructor(private nurseService : NurseService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.getNurseDetails();
    this.getDoctors();
  }

  getNurseDetails(){
    this.nurseService.getNurseDetails().subscribe(response=>{
      this.nurseDetails = response.data;
    })
  }
  getDoctors() {
    this.nurseService.getDoctors().subscribe((response) => {
      for (let doctor of response.data) {
        if(doctor._id !== this.nurseDetails.assignedDoctor?._id){
        this.doctorsList.push({ _id: doctor._id, name: doctor.name });
        }
      }
    });
  }

  submitChangeRequest(request : IRequests){
    this.nurseService.postChangeRequest(request).subscribe(response =>{
      console.log(response);
    })
  }

  onChangeRequest(user:IUserData){
    this.dialogContentData.dialogTitle = `Change ${user.assignedDoctor?.name}  Request`;
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
          for : user.assignedDoctor?._id
        })
      }
    });
  }

  navBarData: INavBarDetails = {
    name: window.localStorage.getItem('name') || '',
    designation: window.localStorage.getItem('role') || '',
    menuItems: [
      { title: 'Home', matIconType: 'home', path: 'nurse' },
      { title: 'Send Message', matIconType: ' message', path: 'nurse/send-message' }
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
        options: this.doctorsList,
        isMultiSelect: false,
      },
    ],
  };
}
