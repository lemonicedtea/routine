import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor() {}

  selectedDate: Date;

  ngOnInit() {
    this.selectedDate = new Date();
  }

  getSelectedYear(): number {
    var m = moment(this.selectedDate);
    return m.get('year');
  }

  getSelectedMonth(): string {
    var m = moment(this.selectedDate);
    return m.format("MMMM");
  }

  progressMonth(): void {
    var m = moment(this.selectedDate).add(1, 'month');
    this.selectedDate = m.toDate();
  }

  regressMonth(): void {
    var m = moment(this.selectedDate).subtract(1, 'month');
    this.selectedDate = m.toDate();
  }

  isNextMonthDisabled(): boolean {
    var today = moment();
    var selectedDate = moment(this.selectedDate);

    return selectedDate.add(1, 'month').isAfter(today);
  }
}
