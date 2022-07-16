import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {

  onChange!: (value: string) => void;
  hide = true;

  @Input() initialOptions: any ;
  @Input() type: string = '';
  @Input() label: string = '';

  selectedOptions = []
  @Input() isMutliSelect = false
  @Input() options = [1,2,3]



}
