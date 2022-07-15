import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Output() buttonClick = new EventEmitter();
  @Input() isDisabled: boolean = false;
  constructor() { }
  hide = true;
  ngOnInit(): void {
  }
  onClick(){
    this.buttonClick.emit();
  }
}
