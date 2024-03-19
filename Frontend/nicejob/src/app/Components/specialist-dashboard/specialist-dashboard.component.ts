import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterLink, RouterOutlet, BackNavigationComponent],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css'
})
export class SpecialistDashboardComponent {

}
