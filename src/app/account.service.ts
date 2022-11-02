import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "./interface/IAccount";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  $account = new BehaviorSubject<IAccount | null>(null);

  $loginError = new BehaviorSubject<string>("");
  private USERNAME_TAKEN_ERROR = "Username is already in use"
  private UNKNOWN_ERROR = "Unknown error, please try again"

  constructor(private httpService: HttpService) {
  }

  public login(username: string, password: string) {
    this.httpService.login(username,password).subscribe({
      next: (account) => {
        this.$account.next(account);
      },
      error: (err) => {
        // TODO - display error to user
        console.error(err)
      }
    })
  }

  public createAccount(username: string, password: string) {
    this.httpService.createAccount(username, password)
      .subscribe({
        next: (account) => {
          this.$account.next(account);
        },
        error: (err) => {
          if (err.status === 409) {
            this.$loginError.next(this.USERNAME_TAKEN_ERROR);
            return;
          }

          this.$loginError.next(this.UNKNOWN_ERROR);
        }
      })
  }
}
