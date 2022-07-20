import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
import { IMessageFormat } from '../../models/doctorInterface';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  displayedColumns: string[] = ["sender","message","time"];
  messageList : IMessageFormat[] = []
  dataSource!: MatTableDataSource<IMessageFormat[]>;
  constructor(private doctorService : DoctorService) { }

  ngOnInit(): void {
    this.getMessages();
  }
  getMessages(){
    this.doctorService.getMessages().subscribe(response=>{
      this.messageList = response.data,
      this.dataSource = new MatTableDataSource<IMessageFormat[]>(
        response.data
      );
      console.log(this.dataSource)
    })
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
