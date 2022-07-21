import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
import { NurseService } from '../../services/nurse.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
  nurseDetails: IUserData = {
    _id: '',
    name: '',
    email: '',
    role: '',
  };
  constructor(private nurseService: NurseService) {}

  ngOnInit(): void {
    this.getNurseDetails();
  }

  getNurseDetails() {
    this.nurseService.getNurseDetails().subscribe((response) => {
      this.nurseDetails = response.data;
    });
  }
  form = new FormGroup({
    text : new FormControl("",[Validators.required])
  })
  navBarData: INavBarDetails = {
    name: window.localStorage.getItem('name') || '',
    designation: window.localStorage.getItem('role') || '',
    menuItems: [
      { title: 'Home', matIconType: 'home', path: 'nurse' },
      {
        title: 'Send Message',
        matIconType: ' message',
        path: 'nurse/send-message',
      },
    ],
  };

  sendMessage(message : IMessageFormat){
    this.nurseService.sendMessage(message).subscribe(response=>{
      console.log(response)
      this.form.controls['text'].reset();
    })
  }

  onSendMessage(messageForm : FormGroup) {
    if(messageForm.valid){
      this.sendMessage({
        ...messageForm.value,
        to : this.nurseDetails.assignedDoctor?._id
      })
    }
  }
}


export interface IMessageFormat{
  to: string,
  text: string
}
