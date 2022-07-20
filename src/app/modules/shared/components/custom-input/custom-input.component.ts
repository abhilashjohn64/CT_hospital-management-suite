import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ICustomInputProperties,
  IOptionsFormat,
} from '../../models/customInputInterface';
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomInputComponent,
      multi: true,
    },
  ],
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {
  onChange!: (value: string) => void;
  @Input() inputAttributes: ICustomInputProperties = {
    type: '',
    label: '',
    validation: [],
  };
  writeValue(obj: any): void {
    this.onChange = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  hide = true;

  previousValue: string = '';
  placeholder: string = '';
  previousOptions : any[] = [];
  ngOnInit(): void {
    this.placeholder = this.inputAttributes.placeholder
      ? this.inputAttributes.placeholder
      : '';
    if (typeof this.inputAttributes.initialValue === 'string')
      this.previousValue = this.inputAttributes.initialValue;
    else if(this.inputAttributes.initialValue){
      this.previousOptions = this.inputAttributes.initialValue?.map(initial=>initial._id)
    }

  }
}
