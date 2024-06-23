export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
}

export interface User {
  id?: number;
  password: string;

  fullname: string;
  dob: Date;
  address: string;
  phone: string;
  orderHistory: string[];
  email: string;

  avatar?: string;
  role: Role;
  likeddish: string[];
}
//import { Role } from './auth.interface';
