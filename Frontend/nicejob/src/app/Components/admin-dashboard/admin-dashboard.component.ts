import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, FooterComponent, BackNavigationComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

isSidebarOpen = false;
isSearchDivVisible=false;

storedUser =''

  constructor() {

  }


toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
  
  setTimeout(() => {
    this.closeSidebar();
  }, 3000)
}
closeSidebar() {
  this.isSidebarOpen = false;
}

}
