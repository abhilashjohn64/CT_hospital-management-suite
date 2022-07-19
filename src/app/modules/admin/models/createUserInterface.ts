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
