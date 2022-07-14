import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  @Output() logOut = new EventEmitter();
  ngOnInit(): void {
  }
  onLogOut(){
    this.logOut.emit();
  }
}
