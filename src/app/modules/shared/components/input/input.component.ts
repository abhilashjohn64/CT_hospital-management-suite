import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  onChange!: (value: string) => void;
  hide = true;

  @Input() initialValue: any ;
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';

  inputValue: string = ""

  constructor() {}
  writeValue(obj: any): void {
    this.onChange = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  ngOnInit(): void {
    this.inputValue= this.initialValue;
  }
}
