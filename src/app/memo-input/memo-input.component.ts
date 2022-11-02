import {Component, Input, OnInit} from '@angular/core';
import {MemoService} from "../memo.service";
import {IMemo} from "../interface/IMemo";

@Component({
  selector: 'app-memo-input',
  templateUrl: './memo-input.component.html',
  styleUrls: ['./memo-input.component.css']
})
export class MemoInputComponent implements OnInit {

  title: string = "";
  body: string = "";
  finished: boolean = false;

  @Input() memo!: IMemo;

  constructor(private memoService: MemoService) {
  }

  ngOnInit(): void {
    if (this.memo) {
      this.title = this.memo.title;
      this.body = this.memo.body;
      this.finished = this.memo.finished;
    }
  }

  onCreate() {
    this.memoService.create(this.title, this.body);
  }

  onUpdate() {
    this.memoService.updateMemo(this.memo.id, this.title, this.body, this.finished);
  }

  onCancel() {
    this.memoService.$memoToUpdate.next(null);
  }

}
