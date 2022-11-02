import {Component} from '@angular/core';
import {AccountService} from "./account.service";
import {MemoService} from "./memo.service";
import {IMemo} from "./interface/IMemo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memo-fe';
  isLoggedIn: boolean = false;
  isRegistering: boolean = false;
  memoToUpdate: IMemo | null = null;

  constructor(private accountService: AccountService, private memoService: MemoService) {
    this.accountService.$account.subscribe(
      (account) => {
        this.isLoggedIn = account !== null;
      }
    );

    this.memoService.$memoToUpdate.subscribe(
      (memo) => {
        this.memoToUpdate = memo;
      }
    );
  }

  onClick() {
    this.isRegistering = !this.isRegistering;
  }

  onLogout() {
    this.accountService.$account.next(null);
  }

}
