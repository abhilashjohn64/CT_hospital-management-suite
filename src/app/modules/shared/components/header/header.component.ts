import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router) { }
  @Output() logOut = new EventEmitter();
  ngOnInit(): void {
  }
  onLogOut(){
    window.localStorage.clear();
    this.router.navigate([""])
  }
}
