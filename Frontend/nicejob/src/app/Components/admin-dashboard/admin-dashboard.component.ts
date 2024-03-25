import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, FooterComponent, BackNavigationComponent, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  isDashboard:boolean = true
  isUsers:boolean = false



dashboardH2Text:string = 'Dashboard'

  constructor() { }








}
