import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { IAdmin } from 'src/app/data-types';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminDetails:IAdmin;


  constructor(private auth:AuthService, private router : Router){}

  ngOnInit()
  {
    if(this.auth.getToken())
    {
      this.router.navigate(['customer']);
    }
  }

  login(){
    if(this.loginForm.valid)
    {
      this.getAdmin();
      this.auth.login(this.loginForm.value).subscribe((result)=>{
        if(result)
        {
          alertify.set('notifier','position', 'top-right');
          alertify.success("Logged In");
          this.loginForm.reset();
          this.auth.storeToken(result.token);
          this.router.navigate(['customer']);
        }
      },
      (error)=>{
        alertify.set('notifier','position', 'top-right');
        alertify.error("Please check your email id or password!")
      })
    }
    else{
      alertify.set('notifier','position', 'top-right');
      alertify.error("Invalid Form")
    }
  }


  getAdmin()
  {
    this.auth.getAdmin(this.loginForm.value.email).subscribe((result)=>{
      if(result)
      {
        this.adminDetails=result;
        localStorage.setItem('adminName',this.adminDetails.name);
        localStorage.setItem('adminEmail',this.adminDetails.email);

      }
    })
  }


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
