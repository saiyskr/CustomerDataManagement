import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAdmin } from 'src/app/data-types';
import { AuthService } from 'src/app/services/auth.service';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent{

  adminDetails:IAdmin;

  constructor(private dialog:MatDialog, private auth:AuthService, private router:Router){}

  resetPasswordForm = new FormGroup({
    email: new FormControl(localStorage.getItem('adminEmail')),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]),
  });
  get password() {
    return this.resetPasswordForm.get('password');
  }
  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  resetPassword()
  {
    if(this.resetPasswordForm.valid)
    {
      this.resetPasswordForm.value.email=this.resetPasswordForm.value.email.toString();
      this.resetPasswordForm.value.password=this.resetPasswordForm.value.password.toString();
      this.resetPasswordForm.value.newPassword=this.resetPasswordForm.value.newPassword.toString();
      this.auth.reset(this.resetPasswordForm.value).subscribe((result)=>{
        alertify.set('notifier','position', 'top-right');
        alertify.success("Password has been Reset");
        setTimeout(()=>{
          this.auth.signOut();
          alertify.set('notifier','position', 'top-right');
          alertify.success("Please Login with the New Password");
        },1000);
      },
      (error)=>{
          alertify.set('notifier','position', 'top-right');
          alertify.error("Old Password does not match");
      });
    }
    this.close();
  }

  close()
  {
    this.dialog.closeAll();
  }


}
