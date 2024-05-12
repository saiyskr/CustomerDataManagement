import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'; 
import {MatTableModule} from '@angular/material/table'
import {HttpClientModule} from '@angular/common/http'
import {NgToastModule} from 'ng-angular-popup'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { NgConfirmModule } from 'ng-confirm-box';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { MapPlottingComponent } from './map-plotting/map-plotting.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { AgmCoreModule } from '@agm/core';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';


@NgModule({
  declarations: [
    AccountHomeComponent,
    AddAccountComponent,
    AccountDetailComponent,
    MapPlottingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    NgToastModule,
    NgConfirmModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    RouterModule,
    NgxPaginationModule,
    MatDividerModule,
    MatListModule ,
    MatCardModule,
    MatExpansionModule,
    NgxMatIntlTelInputComponent,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzfzsRZ4XEwzxiXnjzTybY6TflZnRTeq4',
      libraries: ['places']
    }),
  ],
  exports:[
    AccountHomeComponent,
    AddAccountComponent,
    AccountDetailComponent,
    MapPlottingComponent
  ]
})
export class AccountsModule { }
