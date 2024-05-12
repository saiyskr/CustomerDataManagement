export interface ICustomer {
  customerName?: string;
  logo?: string;
  typeOfCompany?: string;
  description?: string;
  email?: string;
  gstin?: string;
  headquarter?: string;
  phoneNo?: string;
  website?: string;
  countryCode?: string;
  accounts?: IDisplayAccount[];
}
export interface IDisplayCustomer {
  length: any;
  customerName?: string;
  logo?: string;
  gstin?: string;
  email?: string;
  typeOfCompany?: string;
  headquarter?: string;
}

export interface IDisplayAccount {
  length: any;
  accountId?: string;
  accountName?: string;
  location?: string;
  email?: string;
  yearOfEst?: string;
  latitude?: number;
  longitude?: number;
}

export interface IAccount {
  accountId?: string;
  accountName?: string;
  email?: string;
  phoneNo?: string;
  noOfEmp?: string;
  yearOfEst?: string;
  operatingHours?: string;
  manager?: string;
  servicesOffered?: string;
  expenses?: string;
  profit?: string;
  revenue?: string;
  noOfDept?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  gstin?: string;
}


export interface IAdmin{
  name?:string,
  email?:string,
  phone?:string,
  password?:string,
  token?:string,
  newPassword?:string
}

export interface ILogs {
  length?: any;
  logId?: number;
  email?:string;
  adminName?: string;
  customerName?: string;
  accountName?: string;
  action?: string;
  sectionModified?: string;
  date?: string;
  time?:string
}

export interface IPaginatedResults<T>{
  totalCount:number,
  items: T[]
}

export interface IAccountsPaginatedResults{
  totalCount:number,
  item:ICustomer
}