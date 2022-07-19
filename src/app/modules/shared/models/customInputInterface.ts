import {  ValidatorFn} from "@angular/forms";

export interface ICustomInputProperties{
  type: string,
  label: string,
  placeholder ?: string,
  initialValue ?: string | IOptionsFormat[],
  options ? : IOptionsFormat[],
  isMultiSelect ?: boolean,
  validation ?: ValidatorFn[]
}

export interface IOptionsFormat{
  _id ?: string,
  name ?: string
}
