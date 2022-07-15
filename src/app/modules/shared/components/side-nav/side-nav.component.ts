import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavBarDetails } from '../../models/navBarInterface';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() navBarData : INavBarDetails ={
    name: '',
    designation: '',
    menuItems: []
  }
  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  onClick(urlPath:string){
    this.router.navigate([urlPath])
  }
}
