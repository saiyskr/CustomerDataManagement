import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as alertify from 'alertifyjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router){}

  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true;
    }
    else{
      alertify.error("Please Login first")
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
