import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { IAccountsPaginatedResults, ICustomer, IDisplayAccount, IPaginatedResults } from '../../data-types';

@Component({
  selector: 'app-map-plotting',
  templateUrl: './map-plotting.component.html',
  styleUrls: ['./map-plotting.component.css']
})
export class MapPlottingComponent implements OnInit{


 constructor(private customerService:CustomerService){}

  customerDetail:ICustomer;
  customer_id:string;  
  lat = 20.5937;
  long = 78.9629;
  zoom=5;
  logoutButton: any;

  ngOnInit(){
    this.getCustomerList();
  }

  getCustomerList(){
    this.customerService.getCustomerbyId(localStorage.getItem('id')).subscribe((result:ICustomer)=>{
      if(result)
      {
        this.customerDetail = result;
      }
    });
  }

}
