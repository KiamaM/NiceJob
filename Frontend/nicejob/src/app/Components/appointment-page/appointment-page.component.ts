import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SchedulerComponent } from '../scheduler/scheduler.component';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterLink, RouterLinkActive, RouterOutlet, SchedulerComponent],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.css'
})
export class AppointmentPageComponent {

}
