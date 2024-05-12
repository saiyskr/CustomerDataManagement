import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccountsPaginatedResults, ICustomer, IDisplayAccount, IDisplayCustomer, IPaginatedResults } from '../data-types';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer_gstin:string;

  constructor(private http:HttpClient) { }
  apiurl = 'https://localhost:7252/api/Customers';

  invokeEvent: Subject<any> = new Subject(); 
  // to add customer 
  addCustomer(data:ICustomer){
    return this.http.post(this.apiurl, data);
  }
  // to get the list of all the customers
  getCustomer(startIndex,pageSize){
    return this.http.get<IPaginatedResults<IDisplayCustomer[]>>(`${this.apiurl}?startIndex=${startIndex}&pageSize=${pageSize}`);
  }
  // to delete the customer 
  deleteCustomerbyId(id:any){
    return this.http.delete<ICustomer>(`${this.apiurl}/${id}`);
  }
  // to update the specific customer
  updateCustomer(id:any, customerData:ICustomer){
    return this.http.put(`${this.apiurl}/${id}`,customerData);
  }
  getCustomerbyId(id:any): Observable<ICustomer>{
    return this.http.get<ICustomer>(`${this.apiurl}/${id}`);
  }

  getPagedCustomerbyId(id:any,startIndex,pageSize): Observable<IAccountsPaginatedResults>{
    return this.http.get<IAccountsPaginatedResults>(`${this.apiurl}/fetch/${id}?startIndex=${startIndex}&pageSize=${pageSize}`);
  }

  // call when user click on specific customer row -> to fetch all the data of that specific customer
  getCustomerDetail(id:any){
    return this.http.get<ICustomer>(`${this.apiurl}/${id}`);
  }

  searchCustomers(data:string){
    return this.http.get<IDisplayCustomer[]>(`${this.apiurl}$like?search=${data}`);
  }

  callSecondComponent() { 
    this.invokeEvent.next("getList");   
  }
  
}
