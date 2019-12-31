import { Injectable } from '@angular/core';
import { CalendarEntry } from '../interfaces/CalendarEntry';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  calendarBehaviour: BehaviorSubject<CalendarEntry[]> = null;

  get CalendarData(): CalendarEntry[] {
    var result = JSON.parse(localStorage.getItem('CalendarData'));
    if (result) {
      return result;
    }
    return [];
  }

  set CalendarData(data: CalendarEntry[]) {
    localStorage.setItem('CalendarData', JSON.stringify(data));
    this.calendarBehaviour.next(data);
  }

  get CalendarGoal(): string {
    return JSON.parse(localStorage.getItem('CalendarGoal'));
  }

  set CalendarGoal(data: string) {
    localStorage.setItem('CalendarGoal', JSON.stringify(data));
  }

  getCalendarBehaviour(): Observable<CalendarEntry[]> {
    if (this.calendarBehaviour == null) 
      this.calendarBehaviour = new BehaviorSubject<CalendarEntry[]>(this.CalendarData);
    
    return this.calendarBehaviour.asObservable();
  }
}