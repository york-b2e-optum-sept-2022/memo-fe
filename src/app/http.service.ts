import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccount} from "./interface/IAccount";
import {IMemo} from "./interface/IMemo";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  public login(username: string, password: string): Observable<IAccount> {
    return this.httpClient.get(
      `http://localhost:8080/api/account?username=${username}&password=${password}`
    ) as Observable<IAccount>;
  }

  public createAccount(username: string, password: string): Observable<IAccount> {
    return this.httpClient.post(
      "http://localhost:8080/api/account",
      {
        username: username,
        password: password
      }
    ) as Observable<IAccount>
  }

  public createMemo(title: string, body: string, ownerId: number): Observable<IMemo> {
    return this.httpClient.post(
      "http://localhost:8080/api/memo",
      {
        title: title,
        body: body,
        ownerId: ownerId
      }
    ) as Observable<IMemo>
  }

  public getMemoList(accountId: number): Observable<IMemo[]> {
    return this.httpClient.get(
      `http://localhost:8080/api/memo?accountId=${accountId}`
    ) as Observable<IMemo[]>
  }

  public deleteMemo(memoId: number) {
    return this.httpClient.delete(
      `http://localhost:8080/api/memo?memoId=${memoId}`
    )
  }

  public updateMemo(id: number, title: string, body: string, finished: boolean): Observable<IMemo> {
    return this.httpClient.put(
      `http://localhost:8080/api/memo`,
      {
        id: id,
        title: title,
        body: body,
        finished: finished,
      }
    ) as Observable<IMemo>
  }

}
