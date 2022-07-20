export interface IUserData {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  assignedDoctor?: IUserData;
  speciality?: string;
  nurses?: IUserData[];
  resetToken?: string;
  resetTokenExpiry?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
