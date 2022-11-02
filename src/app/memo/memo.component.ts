import {Component, Input, OnInit} from '@angular/core';
import {IMemo} from "../interface/IMemo";
import {MemoService} from "../memo.service";

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {

  @Input() memo!: IMemo;

  constructor(private memoService: MemoService) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.memoService.deleteMemo(this.memo.id);
  }

  onUpdate() {
    this.memoService.$memoToUpdate.next(
      {...this.memo}
    );
  }
}
