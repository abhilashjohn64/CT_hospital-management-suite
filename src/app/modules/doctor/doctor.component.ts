import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICustomInputProperties } from '../shared/models/customInputInterface';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  constructor() { }
  data : ICustomInputProperties = {
    type: "select",
    label: "num",
    placeholder : "",
    isMultiSelect : true,
    validation : [Validators.required]
  }
  dataList : ICustomInputProperties[] = []

  ngOnInit(): void {
    this.form.addControl( this.data.label,new FormControl(this.data.initialValue, this.data.validation))
  }
  form = new FormGroup({});

  onClick(){
    console.log("dsadsadsa")
  }
}

