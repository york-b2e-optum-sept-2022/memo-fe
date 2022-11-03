import {Injectable, OnDestroy} from '@angular/core';
import {HttpService} from "./http.service";
import {AccountService} from "./account.service";
import {BehaviorSubject, first} from "rxjs";
import {IMemo} from "./interface/IMemo";

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  public $memoList = new BehaviorSubject<IMemo[]>([]);
  public $memoToUpdate = new BehaviorSubject<IMemo | null>(null);

  constructor(private httpService: HttpService, private accountService: AccountService) {
    this.accountService.$account.subscribe(
      (account) => {
        if (account !== null) {
          this.getMemoList();
        }
      }
    );
  }

  public create(title: string, body: string) {
    const account = this.accountService.$account.getValue();
    if (account === null) {
      console.error('null account');
      return;
    }

    this.httpService.createMemo(title, body, account.id).pipe(first()).subscribe({
      next: (memo) => {
        let memoList: IMemo[] = [...this.$memoList.getValue()];
        memoList.push(memo);
        this.$memoList.next(memoList);
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    });
  }

  public getMemoList() {
    const account = this.accountService.$account.getValue();
    if (account === null) {
      console.error('null account');
      return;
    }

    this.httpService.getMemoList(account.id).pipe(first()).subscribe({
      next: (memoList) => {
        this.$memoList.next(memoList);
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }

  public deleteMemo(memoToDeleteId: number) {
    this.httpService.deleteMemo(memoToDeleteId).pipe(first()).subscribe({
      next: () => {
        let memoList: IMemo[] = [...this.$memoList.getValue()];
        this.$memoList.next(
          memoList.filter(memo => memo.id !== memoToDeleteId)
        );
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }

  public updateMemo(id: number, title: string, body: string, finished: boolean) {
    this.httpService.updateMemo(id, title, body, finished).pipe(first()).subscribe({
      next: (newMemo) => {
        let memoList: IMemo[] = [...this.$memoList.getValue()];
        this.$memoList.next(
          memoList.map((memo) => {
            if (memo.id !== id) {
              return memo;
            }

            return newMemo;
          })
        );

        this.$memoToUpdate.next(null);
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }
}
