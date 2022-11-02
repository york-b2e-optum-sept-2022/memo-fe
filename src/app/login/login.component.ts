import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  subscription: Subscription;

  constructor(private accountService: AccountService) {
    this.subscription = this.accountService.$loginError.subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick() {
    this.accountService.login(this.username, this.password);
  }

}
