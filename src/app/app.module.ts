import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { YearViewComponent } from './year-view/year-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    StatisticsComponent,
    YearViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
