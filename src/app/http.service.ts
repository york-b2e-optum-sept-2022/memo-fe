import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccount} from "./interface/IAccount";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string): Observable<IAccount> {
      return this.httpClient.get(
        `http://localhost:8080/api/account?username=${username}&password=${password}`
      ) as Observable<IAccount>;
  }

  public createAccount(username: string, password: string): Observable<IAccount>{
    return this.httpClient.post(
      "http://localhost:8080/api/account",
      {
        username: username,
        password: password
      }
    ) as Observable<IAccount>
  }


}
