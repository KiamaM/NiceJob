import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-view-listings',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './view-listings.component.html',
  styleUrl: './view-listings.component.css'
})
export class ViewListingsComponent {

}
