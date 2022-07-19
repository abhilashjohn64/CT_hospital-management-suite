import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomInputProperties } from '../../models/customInputInterface';
import { IInputDialogInput } from '../../models/inputDialogInterface';
@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
})
export class InputDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IInputDialogInput,

  )
  {}
  inputAttributes: ICustomInputProperties[] = [];
  form = new FormGroup({
  });

  ngOnInit(): void {
    this.inputAttributes = this.dialogData.alertInputAttributes;
    for (let input of this.inputAttributes) {
      this.form.addControl(
        input.label,
        new FormControl(input.initialValue, input.validation)
      );
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
  onSubmit(userForm : FormGroup) {
    if(userForm.valid) this.dialogRef.close(userForm.value);
    else this.dialogRef.close();
  }
}
