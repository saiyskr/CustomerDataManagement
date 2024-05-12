import { AutofillMonitor } from '@angular/cdk/text-field';
import { AfterContentChecked, AfterViewChecked, Component,DoCheck,EventEmitter,OnChanges,OnInit, Output, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCustomerComponent } from '../customer/add-customer/add-customer.component';
import { AddAccountComponent } from '../accounts/add-account/add-account.component';
import { ActivatedRoute, Router, RouterEvent, Event } from '@angular/router';
import { SearchService } from '../services/search.service';
import { CustomerHomeComponent } from '../customer/customer-home/customer-home.component';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as alertify from 'alertifyjs';
import { ResetPasswordComponent } from '../admin/reset-password/reset-password.component';
import { LogsService } from '../services/logs.service';
import { TransitionCheckState } from '@angular/material/checkbox';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private logs:LogsService, private dialog: MatDialog, private route:Router, private router:ActivatedRoute, private auth:AuthService, private search:SearchService){}
  menuType:String='customer';
  enteredSearch:string="";
  customer_id:string;
  url:string;
  adminName:string=localStorage.getItem('adminName');  

  ngOnInit():void{

  this.url=this.router.snapshot['_routerState'].url;

    if(this.url && this.url.includes('logs')){
      if(this.url && this.url.includes('logs')){
        this.menuType='logs';
      }
    }
    else if(this.url && this.url.includes('@')){
      if(this.url && this.url.includes('@')){
        this.menuType='account_detail';
      }
    }
    else if(this.url && !this.url.includes('/accounts')){  
      if(this.url && !this.url.includes('/accounts')){
        this.menuType='customers';
      }
    }
    else{
      if(this.url && this.url.includes('/accounts')){
        this.menuType='accounts';
      }
    } 


  this.route.events.subscribe((val:any)=>{

    if(val.url && val.url.includes('logs')){
      if(val.url && val.url.includes('logs')){
        this.menuType='logs';
      }
    }
    else if(val.url && val.url.includes('@')){
      if(val.url && val.url.includes('@')){
        this.menuType='account_detail';
      }
    }
    else if(val.url && !val.url.includes('/accounts')){  
      if(val.url && !val.url.includes('/accounts')){
        this.menuType='customers';
      }
    }
    else{
      if(val.url && val.url.includes('/accounts')){
        this.menuType='accounts';
      }
    } 
   });
  }



  addCustomer(){
    this.dialog.open(AddCustomerComponent,{
      disableClose:true,
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      data:{
        modalTitle:"Add Customer Form",
        button:"Add"
      }
    });
  }

  addAccount(){
    this.dialog.open(AddAccountComponent,{
      disableClose:true,
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      data:{
        customer_id:this.customer_id,
        modalTitle:"Add Account Form",
        button:"Add"
      }
    });
  }

  logout()
  {
    this.auth.signOut();
    alertify.set('notifier','position', 'top-right');
    alertify.error("Logged out")
  }

  onSearchTextChanged()
  {
    this.search.searchValue = this.enteredSearch;
    this.search.callSecondComponent();
  }

  clearSearch()
  {
    this.enteredSearch="";
    this.search.searchValue = this.enteredSearch;
  }

  resetPassword()
  {
    this.dialog.open(ResetPasswordComponent,{
      disableClose:true,
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      width: '400px',
      backdropClass: "backgroundblur",
    });
  }
  
}
