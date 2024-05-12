import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './accounts/account-detail/account-detail.component';
import { AccountHomeComponent } from './accounts/account-home/account-home.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { MapPlottingComponent } from './accounts/map-plotting/map-plotting.component';
import { LogsComponent } from './logs/logs.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "customer/:id/accounts/:accountid",
    component: AccountDetailComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: "logs",
    component: LogsComponent,
    canActivate:[AuthGuard],
  },
  {
    path: "customer/:id/accounts",
    component: AccountHomeComponent,
    canActivate:[AuthGuard],
  },
  {
    path: "customer",
    component: CustomerHomeComponent,
    canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
