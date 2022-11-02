import { Component } from '@angular/core';
import {AccountService} from "./account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memo-fe';
  isLoggedIn: boolean = false;

  constructor(private accountService: AccountService) {
    this.accountService.$account.subscribe(
      (account) => {
        this.isLoggedIn = account !== null
      }
    )
  }

}
