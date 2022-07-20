import { IUserData } from "../../shared/models/userDataInterface"

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

export interface  IRequests{
  for : string,
  replacement : string,
  reason : string,
}

export interface IStatusRequest{
  _id: string,
  title: string,
  type: string,
  __v: number,
  createdAt: string,
  updatedAt: string
}

export interface IMessageFormat{
    _id: string,
    from: IUserData[],
    to: string,
    text: string,
    createdAt: string,
    updatedAt: string,
    __v: number

}
