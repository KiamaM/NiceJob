import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgendaService, DayService, EventSettingsModel, MonthAgendaService, MonthService, ScheduleModule, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data'
import { ApiService } from '../../Services/api.service';
import { AuthService } from '../../Services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { users } from '../../Interfaces/users.interface';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [ScheduleModule, RouterOutlet ],
  template: `<ejs-schedule> [eventSettings]="eventObject" </ejs-schedule>`,
  styleUrl: './scheduler.component.css',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]

})
export class SchedulerComponent {

 



}
