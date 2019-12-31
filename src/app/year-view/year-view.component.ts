import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../services/storage';
import { CalendarEntry } from '../interfaces/CalendarEntry';
import { CalendarUnit } from '../interfaces/CalendarUnit';
import * as moment from 'moment';
import { DayOfWeek } from '../enums/DayOfWeek';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-year-view',
  templateUrl: './year-view.component.html',
  styleUrls: ['./year-view.component.scss']
})
export class YearViewComponent implements OnInit, OnDestroy {

  constructor(
    private storageService: StorageService
  ) { }

  today: moment.Moment;
  save: CalendarEntry[] = [];
  grid: CalendarUnit[][] = [[]];

  calendarSubscription = new Subscription();

  ngOnInit() {
    this.today = moment();

    this.storageService.getCalendarBehaviour().subscribe(
      x => {
        this.save = x;
        this.generateGrid();
      }
    );
  }

  ngOnDestroy() {
    this.calendarSubscription.unsubscribe();
  }

  private generateGrid(): void {
    var current = moment(this.today).startOf('year');
    var nextYear = current.get('year') + 1;
    
    var row = 0;
    var col = 0;

    while (current.get('year') < nextYear) {
      this.grid[row][col] = {
        day: current.get('date'),
        month: current.get('month'),
        year: current.get('year'),
        selected: this.save.find(x => x.day == current.get('date') && x.month == current.get('month') && x.year == current.get('year')) != null,
        today: moment(current).startOf('day').isSame(moment(this.today).startOf('day'))
      };

      if (col >= 9) {
        col = 0;
        row++;
        this.grid[row] = [];
      } else {
        col++;
      }

      current.add(1, 'day');
    }
  }
}
