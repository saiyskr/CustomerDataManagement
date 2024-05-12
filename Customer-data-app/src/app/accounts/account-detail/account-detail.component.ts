import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from 'src/app/data-types';
import { AccountService } from 'src/app/services/account.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  account_id: string;

  accountDetails: IAccount;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  menuType: string;

  ngOnInit() {

      this.route.paramMap.subscribe((res) => {
        let id = res.get('accountid');

        if (id) {
          this.account_id = id;
        }
      });

      this.getAccountbyid(this.account_id);
  }

  getAccountbyid(account_id: string) {
    this.accountService.getAccountbyId(account_id).subscribe(async (result) => {
      if (result) {
        this.accountDetails = await result;
      }
    });
  }

  backButton()
  {
    this.location.back();
  }

}
