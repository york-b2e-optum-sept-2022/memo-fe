import {Component, OnInit} from '@angular/core';
import {MemoService} from "../memo.service";
import {IMemo} from "../interface/IMemo";

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.css']
})
export class MemoListComponent implements OnInit {

  public memoList: IMemo[] = [];

  constructor(private memoService: MemoService) {
    this.memoService.$memoList.subscribe(
      memoList => {
        this.memoList = memoList
        console.log(this.memoList)
      }
    );
  }

  ngOnInit(): void {
  }

}
