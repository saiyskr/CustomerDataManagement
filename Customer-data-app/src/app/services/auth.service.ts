import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAdmin } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email:string="";
  apiurl = 'https://localhost:7252/api/Admin/'
  constructor(private http:HttpClient, private router:Router) { }

  signUp(userObj:any)
  {
    return this.http.post<any>(`${this.apiurl}register`, userObj);
  }

  login(loginObj:any)
  {
    return this.http.post<any>(`${this.apiurl}authenticate`, loginObj);
  }

  reset(resetObj:any)
  {
    return this.http.put<any>(`${this.apiurl}reset`, resetObj);
  }

  getAdmin(id:any)
  {
    return this.http.get<IAdmin>(`${this.apiurl}${id}`);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  signOut()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
