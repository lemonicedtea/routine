import { Injectable } from '@angular/core';
import { CalendarEntry } from '../interfaces/CalendarEntry';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
    get CalendarData(): CalendarEntry[] {
      var result = JSON.parse(localStorage.getItem('CalendarData'));
      if (result)
        return result;
      return [];
    }

    set CalendarData(data: CalendarEntry[]) {
      localStorage.setItem('CalendarData', JSON.stringify(data));
    }
}