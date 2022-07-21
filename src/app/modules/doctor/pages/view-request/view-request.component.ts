import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { INavBarDetails } from 'src/app/modules/shared/models/navBarInterface';
import { IUserData } from 'src/app/modules/shared/models/userDataInterface';
import { IChangeRequests } from '../../models/doctorInterface';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {
  displayedColumns: string[] = ['change','reason','replacement', 'time','status','operations'];
  changeRequestList : IChangeRequests[] = []
  dataSource!: MatTableDataSource<IChangeRequests[]>;
  constructor(private doctorService : DoctorService) { }


  ngOnInit(): void {
    this.doctorService.getChangeRequest().subscribe(response =>{
      this.changeRequestList = response.data
      this.dataSource = new MatTableDataSource<IChangeRequests[]>(response.data);
    })
  }
  sendRemainer(id : string){
    this.doctorService.sendRemainder(id).subscribe(response =>{
      console.log(response)
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
