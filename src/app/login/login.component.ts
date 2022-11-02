import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.accountService.login(this.username, this.password);
  }

}
