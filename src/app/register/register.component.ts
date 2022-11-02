import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  subscription: Subscription;

  constructor(private accountService: AccountService) {
    this.subscription = this.accountService.$registrationError.subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick() {
    this.accountService.createAccount(
      this.username,
      this.password
    );
  }

}
