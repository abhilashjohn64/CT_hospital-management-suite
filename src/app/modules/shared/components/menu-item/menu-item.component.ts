import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() matIconType : string = ""
  @Output() click = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit();
  }
}
