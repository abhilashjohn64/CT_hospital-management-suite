import { IUserData } from "../../shared/models/userDataInterface"

export interface ICreateUserData{
    name: string,
    email: string,
    role: string,
    speciality?: string,
    nurses ?: []
    assignedDoctor ?:string
}
export interface IUpdateUserData{
  _id : string
  name?: string,
  email?: string,
  role?: string,
  speciality?: string,
  nurses ?: []
  assignedDoctor ?:string
}

export interface  IChangeRequests{
  _id  :string,
  from  : IUserData[],
  for : IUserData[],
  replacement : IUserData[],
  reason : string,
  status : IStatusRequest[],
  createdAt: string,
  updatedAt: string
  __v: number,
}

export interface IStatusRequest{
  _id: string,
  title: string,
  type: string,
  __v: number,
  createdAt: string,
  updatedAt: string
}
