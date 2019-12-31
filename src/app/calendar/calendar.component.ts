import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { DayOfWeek } from '../enums/DayOfWeek';
import { CalendarUnit } from '../interfaces/CalendarUnit';
import { StorageService } from '../services/storage';
import { CalendarEntry } from '../interfaces/CalendarEntry';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(
    private storageService: StorageService
  ) { }

  today: moment.Moment;
  calendar: CalendarUnit[][] = [[]];

  save: CalendarEntry[] = [];

  displayedDate: moment.Moment;

  @Input()
  set date(data: Date) {
    this.buildCalendar(moment(data));
  }

  ngOnInit() {
    this.save = this.storageService.CalendarData;

    this.today = moment().startOf('day');
    this.buildCalendar(this.today);
  }

  getCurrentYear(): number {
    return this.today.get('year');
  }

  getCurrentMonth(): string {
    return this.today.format('MMMM');
  }

  toggleDate(x: number, y: number): void {
    if (this.calendar[x] != null && this.calendar[x][y] != null && !this.calendar[x][y].disabled) {
      var value = this.calendar[x][y].selected;
      this.calendar[x][y].selected = !value;
      
      if (!value == true) {
        this.save.push({
          day: this.calendar[x][y].day,
          month: this.calendar[x][y].month,
          year: this.calendar[x][y].year,
        });
      } else {
        var idx = this.save.indexOf(this.save.find(c => (c.year != this.calendar[x][y].year && c.month != this.calendar[x][y].month && c.day != this.calendar[x][y].day)));
        this.save.splice(idx, 1);
      }

      this.storageService.CalendarData = this.save;
    }
  }

  getSelectedYear(): number {
    return this.displayedDate.get('year');
  }

  getSelectedMonth(): string {
    return this.displayedDate.format("MMMM");
  }

  progressMonth(): void {
    this.displayedDate.add(1, 'month');
    this.buildCalendar(this.displayedDate);
  }

  regressMonth(): void {
    this.displayedDate.subtract(1, 'month');
    this.buildCalendar(this.displayedDate);
  }

  isNextMonthDisabled(): boolean {
    var selectedDate = moment(this.displayedDate);
    return selectedDate.add(1, 'month').isAfter(this.today);
  }

  isPreviousMonthDisabled(): boolean {
    var currentYear = this.today.get('year');
    var previousYear = moment(this.displayedDate).subtract(1, 'month').get('year');
    
    return currentYear != previousYear;
  }

  private buildCalendar(inputDate: moment.Moment): void {
    this.displayedDate = moment(inputDate);
    this.calendar = [[]];

    var startOfMonth = moment(inputDate).startOf('month');
    var endOfMonth = moment(inputDate).endOf('month');

    var col = 0;
    var row = 0;

    // PAST
    if (startOfMonth.day() != DayOfWeek.Sunday) {
      var lastMonth = moment(startOfMonth).subtract(1, 'month');
      var finalWeek = moment(lastMonth).endOf('month').startOf('week');
      
      while (finalWeek.get('month') == lastMonth.get('month')) {
        this.calendar[0][col] = {
          day: finalWeek.get('date'),
          month: finalWeek.get('month'),
          year: finalWeek.get('year'),
          disabled: true,
          selected: this.save.find(x => x.day == finalWeek.get('date') && x.month == finalWeek.get('month') && x.year == finalWeek.get('year')) != null,
          today: moment(lastMonth).startOf('month').set('date', finalWeek.get('date')).isSame(this.today)
        };

        col++;
        finalWeek.add(1, 'day')
      }
    }

    // CURRENT
    var currentDay = 1;
    while (currentDay <= endOfMonth.get('date')) {
      this.calendar[row][col] = {
        day: currentDay,
        month: startOfMonth.get('month'),
        year: startOfMonth.get('year'),
        disabled: moment(startOfMonth).startOf('month').set('date', currentDay).isAfter(this.today),
        selected: this.save.find(x => x.day == currentDay && x.month == startOfMonth.get('month') && x.year == startOfMonth.get('year')) != null,
        today: moment(startOfMonth).startOf('month').set('date', currentDay).isSame(this.today)
      };

      if (col == DayOfWeek.Saturday) {
        col = DayOfWeek.Sunday;
        row++;
        this.calendar[row] = [];
      } else {
        col++;
      }

      currentDay++;
    }

    // FUTURE
    if (col != DayOfWeek.Sunday) {
      var futureDay = 1;
      var nextMonth = moment(startOfMonth).add(1, 'month');
      while (col <= DayOfWeek.Saturday) {
        this.calendar[row][col] = {
          day: futureDay,
          month: nextMonth.get('month'),
          year: nextMonth.get('year'),
          disabled: true,
          selected: this.save.find(x => x.day == futureDay && x.month == nextMonth.get('month') && x.year == nextMonth.get('year')) != null,
          today: moment(lastMonth).startOf('month').set('date', futureDay).isSame(this.today)
        };
        col++;
        futureDay++;
      }
    }
  }
}
