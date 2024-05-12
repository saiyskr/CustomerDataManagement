import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAccountsPaginatedResults, IAdmin, ICustomer, IDisplayCustomer, ILogs, IPaginatedResults } from 'src/app/data-types';
import { CustomerService } from 'src/app/services/customer.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import * as alertify from 'alertifyjs';
import { SearchService } from 'src/app/services/search.service';
import { AuthService } from 'src/app/services/auth.service';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  logs: ILogs={};
  customerList :  IDisplayCustomer[];
  dataSource: any;
  empdata: any;
  totalCustomer : any;
  customer:ICustomer;

  pageNumber:number =1;
  pageSize:number = 10;
  constructor(private customerService: CustomerService, private dialog: MatDialog, private auth:AuthService, public searchService:SearchService, private logService:LogsService) {
    this.searchService.invokeEvent.subscribe(value => {
      if(value){
       this.searchCustomers(value); 
     }
     else{
      this.getList();
     }
    });

    this.customerService.invokeEvent.subscribe(value=>{
      if(value)
      {
        this.getList();
      }
    });
  }


  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.customerService.getCustomer((this.pageNumber-1)*this.pageSize,this.pageSize).subscribe((result:IPaginatedResults<IDisplayCustomer>)=>{
      this.customerList = result.items;
      this.totalCustomer = result.totalCount;
    });
  }

  updateCustomer(id: string) {
    this.dialog.open(AddCustomerComponent, {
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      disableClose:true,
      data: {
        id: id,
        modalTitle: 'Update Customer Form',
        button: 'Update'
      }
    });
  }

  getCustomerName(id)
  {
    this.customerService.getCustomerbyId(id).subscribe((result:ICustomer)=>{
      this.customer=result;
    })
  }

  deleteCustomer(id: string) {
    alertify.confirm("Delete Customer", "Do you want to delete this customer?", () => {
      this.getCustomerName(id);
      this.customerService.deleteCustomerbyId(id).subscribe(r => {
        alertify.set('notifier','position', 'top-right');
        alertify.success('Deleted Successfully');
        this.getList();
        this.addLog('Delete');
      },
      (error) => 
      {
        alertify.set('notifier','position', 'top-right');
        alertify.error("Customer has existing accounts");
      });
    }, function () {

    });

  }

  addLog(action:string)
  {
    this.logs.customerName=this.customer.customerName;
    this.logs.adminName=localStorage.getItem('adminName');
    this.logs.accountName="-";
    this.logs.action="Delete";
    this.logs.sectionModified='Customer';
    this.logs.date=new Date().toString();
    this.logs.time=new Date().toString();
    this.logService.addLog(this.logs).subscribe((result)=>{
    });
  }

  onPageChange(event:number){
    this.pageNumber=event;
    this.getList();
  }


  searchCustomers(value)
  {
      this.customerService.searchCustomers(value).subscribe((result)=>{
          if(result)
          {
            this.customerList=result;
          }
      });
  }

}
