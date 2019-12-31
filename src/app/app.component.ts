import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { StorageService } from './services/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private storageService: StorageService
  ) {}

  goal: string;

  ngOnInit() {
    this.goal = this.storageService.CalendarGoal;
  }

  setGoal() {
    this.storageService.CalendarGoal = this.goal;
    console.log(this.goal);
  }
}
