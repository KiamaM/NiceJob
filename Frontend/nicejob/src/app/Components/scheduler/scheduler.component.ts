import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgendaService, DayService, MonthAgendaService, MonthService, ScheduleModule, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';


@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [ScheduleModule, RouterOutlet ],
  template: `<ejs-schedule> </ejs-schedule>`,
  styleUrl: './scheduler.component.css',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]

})
export class SchedulerComponent {

}
